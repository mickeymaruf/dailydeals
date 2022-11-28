import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Heading from '../../../components/Heading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PK);

const Payment = () => {
    const order = useLoaderData();
    const { productName, productId, image, price, buyer, buyerContact, buyerEmail } = order;
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
                    <h4 className='font-medium text-accent mb-3 border-b pb-2'>Product Details: </h4>
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src={image} alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                        <div className="font-bold">
                            {
                                productName.length > 25 ?
                                    <div className="tooltip tooltip-right" data-tip={productName}>
                                        {productName.slice(0, 25) + '...'}
                                    </div>
                                    :
                                    productName
                            }
                            <p className='text-sm opacity-50'>Price: {price} BDT</p>
                        </div>
                    </div>
                    <h4 className='font-medium text-accent mb-3 mt-6 border-b pb-2'>Your Information: </h4>
                    <div>
                        <strong>{buyer}</strong> <br />
                        {buyerContact} <br />
                        <p className='badge badge-ghost'>{buyerEmail}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;