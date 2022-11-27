import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Heading from '../../../components/Heading';
import { useAuth } from '../../../contexts/AuthProvider';
import moment from 'moment';

const MyOrders = () => {
    const { user } = useAuth()
    const { data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: () => fetch(`${import.meta.env.VITE_APP_API_URL}/myorders?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('DAILY_DEALS_ACCESS_TOKEN')}`
            }
        })
            .then(res => res.json())
    })

    
    return (
        <div>
            <Heading>My Orders</Heading>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Your Contact</th>
                            <th>Meeting location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(product => <tr key={product._id}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={product.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">
                                                {
                                                    product.productName.length > 25 ?
                                                        <div className="tooltip tooltip-right" data-tip={product.productName}>
                                                            {product.productName.slice(0, 25) + '...'}
                                                        </div>
                                                        :
                                                        product.productName
                                                }
                                            </div>
                                            <p className='text-sm opacity-50'>Price: {product.price} BDT</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {product.buyerContact} <br />
                                    <p className='badge badge-ghost badge-sm'>{product.buyerEmail}</p>
                                </td>
                                <td>
                                    <div>{product.meetingLocation}</div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;