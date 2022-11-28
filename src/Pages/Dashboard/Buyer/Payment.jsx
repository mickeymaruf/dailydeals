import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Heading from '../../../components/Heading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PK);

const Payment = () => {
    const order = useLoaderData();
    // console.log(order);
    return (
        <div>
            <Heading>Payment</Heading>
            <div className='grid grid-cols-12 gap-5'>
                <div className='col-span-7 rounded-lg'>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm order={order} />
                    </Elements>
                </div>
                <div className='col-span-5 border p-3 rounded-lg'>
                    p
                </div>
            </div>
        </div>
    );
};

export default Payment;