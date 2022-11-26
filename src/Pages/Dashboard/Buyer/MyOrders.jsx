import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Heading from '../../../components/Heading';
import { useAuth } from '../../../contexts/AuthProvider';
import moment from 'moment';

const MyOrders = () => {
    const { user } = useAuth()
    const { data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: () => fetch(`${import.meta.env.VITE_APP_API_URL}/myorders?email=${user?.email}`)
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
                            <th>Status</th>
                            <th>Posted At</th>
                            <th></th>
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
                                                {/* {
                                                    product.name.length > 16 ?
                                                        <div className="tooltip tooltip-right" data-tip={product.name}>
                                                            {product.name.slice(0, 16) + '...'}
                                                        </div>
                                                        :
                                                        product.name
                                                } */}
                                            </div>
                                            <div className="text-sm opacity-50">Price: {product.price} BDT</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p className='text-sm'>{product.location}</p>
                                    <span className="badge badge-ghost badge-sm">Available</span>
                                </td>
                                <td>
                                    <p className='text-xs'>{moment(product.createdAt).fromNow()}</p>
                                </td>
                                <th>
                                    <button className="btn btn-warning btn-xs mr-2">Advertise</button>
                                    <button className="btn btn-error btn-xs">Delete</button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;