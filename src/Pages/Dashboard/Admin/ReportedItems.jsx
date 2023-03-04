import React from 'react';
import toast from 'react-hot-toast';
import Heading from '../../../components/Heading';
import Spinner from '../../../components/Spinner';
import { useDeleteReportMutation, useGetReportedProductsQuery } from '../../../features/product/productApi';

const ReportedItems = () => {
    const { data: reportedProducts = [], refetch, isLoading } = useGetReportedProductsQuery();
    const [deleteReport] = useDeleteReportMutation();

    const handleDeleteReport = id => {
        deleteReport(id)
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Deleted successfully!`)
                }
            })
    }

    return (
        <div>
            <Heading>Reported Items</Heading>
            {
                isLoading ? <Spinner /> :
                    reportedProducts.length < 1 ?
                        <h3 className='text-center text-2xl font-thin'>Nothing's Found</h3>
                        :
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
                                        reportedProducts.map(item => <tr key={item._id}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">
                                                            {
                                                                item.name.length > 25 ?
                                                                    <div className="tooltip tooltip-bottom" data-tip={item.name}>
                                                                        {item.name.slice(0, 25) + '...'}
                                                                    </div>
                                                                    :
                                                                    item.name
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="badge badge-ghost">{item.personWhoReported}</span>
                                            </td>
                                            <th>
                                                <button onClick={() => handleDeleteReport(item._id)} className="btn btn-error btn-xs">delete product</button>
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

export default ReportedItems;