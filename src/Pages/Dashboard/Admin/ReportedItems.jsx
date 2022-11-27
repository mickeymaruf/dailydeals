import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Heading from '../../../components/Heading';

const ReportedItems = () => {
    const { data: reportedProducts = [], refetch } = useQuery({
        queryKey: ['reportedProducts'],
        queryFn: () => fetch(`${import.meta.env.VITE_APP_API_URL}/reportedProducts`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('DAILY_DEALS_ACCESS_TOKEN')}`
            }
        })
            .then(res => res.json())
    })

    const handleDeleteProduct = (id, name) => {
        const confirmDelete = confirm(`Are your sure want to delete ${name}`);
        if (confirmDelete) {
            fetch(`${import.meta.env.VITE_APP_API_URL}/reportedProducts/${id}`, {
                method: 'DELETE',
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('DAILY_DEALS_ACCESS_TOKEN')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        refetch();
                        toast.success(`${name} deleted`)
                    }
                })
        }
    }

    return (
        <div>
            <Heading>Reported Items</Heading>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reportedProducts.map(product => <tr key={product._id}>
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
                                                    product.name.length > 25 ?
                                                        <div className="tooltip tooltip-bottom" data-tip={product.name}>
                                                            {product.name.slice(0, 25) + '...'}
                                                        </div>
                                                        :
                                                        product.name
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="badge badge-ghost">{product.personWhoReported}</span>
                                </td>
                                <th>
                                    <button onClick={() => handleDeleteProduct(product.productId, product.name)} className="btn btn-error btn-xs">delete product</button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedItems;