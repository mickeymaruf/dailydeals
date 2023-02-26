import React from 'react';
import Heading from '../../../components/Heading';
import { useAuth } from '../../../contexts/AuthProvider';
import moment from 'moment';
import toast from 'react-hot-toast';
import Spinner from '../../../components/Spinner';
import { useAdvertiseProductMutation, useDeleteProductMutation, useGetMyProductsQuery } from '../../../features/product/productApi';

const MyProducts = () => {
    const { user } = useAuth();
    const { data: products = [], isLoading } = useGetMyProductsQuery(user.email);

    // handle delete product
    const [deleteProduct] = useDeleteProductMutation();
    const handleDeleteProduct = id => {
        deleteProduct(id).then(data => {
            if (data?.data?.deletedCount > 0) {
                toast.success("Product deleted!");
            }
        })
    }

    // advertise product
    const [advertiseProduct] = useAdvertiseProductMutation()
    const handleAdvertiseProduct = (id, name) => {
        advertiseProduct(id).then(data => {
            if (data?.data?.modifiedCount) {
                toast.success(`${name} advertised successfully`);
            }
        })
    }

    return (
        <div>
            <Heading>My Products</Heading>
            {
                isLoading ? <Spinner /> :
                    products.length < 1 ?
                        <h3 className='text-center text-2xl font-thin'>No product is found!</h3>
                        :
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
                                        products.map(product => <tr key={product._id}>
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
                                                                product.name.length > 16 ?
                                                                    <div className="tooltip tooltip-right" data-tip={product.name}>
                                                                        {product.name.slice(0, 16) + '...'}
                                                                    </div>
                                                                    :
                                                                    product.name
                                                            }
                                                        </div>
                                                        <div className="text-sm opacity-50">Price: {product.price} BDT</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className='text-sm'>{product.location}</p>
                                                <span className="badge badge-ghost badge-sm">{product.status === "sold" ? <span className='text-error font-bold'>sold out</span> : 'Available'}</span>
                                            </td>
                                            <td>
                                                <p className='text-xs'>{moment(product.createdAt).fromNow()}</p>
                                            </td>
                                            <th>
                                                {
                                                    product.isAdvertised ?
                                                        <button className="btn btn-warning btn-xs mr-2" disabled>Advertise</button>
                                                        :
                                                        <button onClick={() => handleAdvertiseProduct(product._id, product.name)} className="btn btn-warning btn-xs mr-2">Advertise</button>
                                                }
                                                <button onClick={() => handleDeleteProduct(product._id)} className="btn btn-error btn-xs">Delete</button>
                                            </th>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
            }
        </div>
    );
};

export default MyProducts;