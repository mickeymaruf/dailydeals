import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { FaCheckCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import SpinnerSm from '../../../components/SpinnerSm'
import { useCreatePaymentIntentMutation, useMakePaymentsMutation } from '../../../features/buyer/buyerApi';

const CheckoutForm = ({ order }) => {
    const [clientSecret, setClientSecret] = useState("");
    const [cardError, setCardError] = useState('');
    const [cardSuccess, setCardSuccess] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);
    const { _id, price, productId, buyer, buyerEmail, paid } = order;
    const [isPaid, setIsPaid] = useState(paid);
    const stripe = useStripe();
    const elements = useElements();

    const [createPaymentIntent] = useCreatePaymentIntentMutation();
    const [makePayments] = useMakePaymentsMutation();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        createPaymentIntent({ price })
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
                productId,
                transactionId: paymentIntent.id,
                email: buyerEmail,
                orderId: _id
            }
            makePayments(payment)
                .then((data) => {
                    if (data.insertedId) {
                        setIsPaid(true);
                        setCardSuccess("Congrats! your payment completed");
                        setTransactionId(paymentIntent.id);
                        Swal.fire(
                            'Congrats!',
                            'Your payment succeeded!',
                            'success'
                        )
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
            {
                isPaid ? <span className='btn btn-primary w-full mt-3'><FaCheckCircle className='w-6 h-6' /></span> :
                    <button className='btn btn-primary w-full mt-3' type="submit" disabled={!stripe || !clientSecret || processing}>
                        {
                            processing ?
                                <>
                                    Processing
                                    <SpinnerSm />
                                </>
                                :
                                'Pay'
                        }
                    </button>
            }
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