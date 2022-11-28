import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'

const CheckoutForm = ({ order }) => {
    const [clientSecret, setClientSecret] = useState("");
    const [cardError, setCardError] = useState('');
    const [cardSuccess, setCardSuccess] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);
    const { _id, price, buyer, buyerEmail } = order;
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch(`${import.meta.env.VITE_APP_API_URL}/create-payment-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('DAILY_DEALS_ACCESS_TOKEN')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log(error);
            setCardError(error.message);
        } else {
            setCardError('');
            console.log(paymentMethod);
        }

        setCardSuccess("")
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: buyer,
                        email: buyerEmail,
                    },
                },
            },
        );
        if (confirmError) {
            setCardError(confirmError.message);
            setProcessing(false);
            return
        }
        setCardError('');
        if (paymentIntent.status === "succeeded") {
            // store info in db
            const payment = {
                price,
                transactionId: paymentIntent.id,
                email: buyerEmail,
                orderId: _id
            }
            fetch(`${import.meta.env.VITE_APP_API_URL}/payments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('DAILY_DEALS_ACCESS_TOKEN')}`
                },
                body: JSON.stringify(payment),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.insertedId) {
                        setCardSuccess("Congrats! your payment completed");
                        setTransactionId(paymentIntent.id);
                    }
                });
        }
        setProcessing(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                className='border px-3 py-4 rounded-lg'
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-primary w-full mt-3' type="submit" disabled={!stripe || !clientSecret || processing}>
                {
                    processing ?
                        <>
                            Processing
                            <div className="flex items-center justify-center space-x-2 ml-2">
                                <div className="w-[6px] h-[6px] rounded-full animate-pulse dark:bg-white"></div>
                                <div className="w-[6px] h-[6px] rounded-full animate-pulse dark:bg-white"></div>
                                <div className="w-[6px] h-[6px] rounded-full animate-pulse dark:bg-white"></div>
                            </div>
                        </>
                        :
                        'Pay'
                }
            </button>
            <p className='text-error mt-2'>{cardError}</p>
            {
                cardSuccess &&
                <div>
                    <p className='text-primary'>{cardSuccess}</p>
                    <p>Your transactionId: <strong>{transactionId}</strong></p>
                </div>
            }
        </form>
    );
};

export default CheckoutForm;