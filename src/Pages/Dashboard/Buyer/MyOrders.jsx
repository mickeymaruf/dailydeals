import React from 'react';
import Heading from '../../../components/Heading';
import { useAuth } from '../../../contexts/AuthProvider';
import { Link } from 'react-router-dom';
import { AiFillEye } from 'react-icons/ai';
import Spinner from '../../../components/Spinner';
import { useGetMyOrdersQuery } from '../../../features/buyer/buyerApi';

const MyOrders = () => {
    const { user, logOut } = useAuth()
    const { data: orders = [], isLoading } = useGetMyOrdersQuery(user?.email);

    return (
        <div>
            <Heading>My Orders</Heading>
            {
                isLoading ? <Spinner /> :
                    orders.length < 1 ?
                        <h3 className='text-center text-2xl font-thin'>No Order Found!</h3>
                        :
                        <div className="overflow-x-auto w-full">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Your Contact</th>
                                        <th>Meeting location</th>
                                        <th>Payment</th>
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
                                            <td>
                                                {
                                                    product.paid ?
                                                        <>
                                                            <div className="dropdown dropdown-end">
                                                                <label tabIndex={0} className="btn btn-xs btn-primary">paid<AiFillEye className='ml-1' /></label>
                                                                <ul tabIndex={0} className="dropdown-content menu text-sm p-2 shadow bg-warning rounded-box">
                                                                    <li>Transaction Id: {product.transactionId}</li>
                                                                </ul>
                                                            </div>
                                                        </>
                                                        :
                                                        <Link to={`/dashboard/payment/${product._id}`}>
                                                            <button className='btn btn-sm btn-info'>Pay</button>
                                                        </Link>
                                                }
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
            }
        </div>
    );
};

export default MyOrders;