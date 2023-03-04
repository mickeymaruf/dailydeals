import React from 'react';
import toast from 'react-hot-toast';
import Heading from '../../../components/Heading';
import Spinner from '../../../components/Spinner';
import { useAuth } from '../../../contexts/AuthProvider';
import { useDeleteUserMutation, useGetSellersQuery, useVerifyUserMutation } from '../../../features/auth/userApi';

const AllSellers = () => {
    const [verifyUser] = useVerifyUserMutation();
    const [deleteUser] = useDeleteUserMutation();
    const { logOut } = useAuth();

    const { data: sellers = [], isLoading } = useGetSellersQuery();

    const handleDeleteUser = (id, name) => {
        const confirmDelete = confirm(`Are your sure want to delete ${name}`);
        if (confirmDelete) {
            deleteUser(id)
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success(`${name} deleted`)
                    }
                })
        }
    }

    const handleVerifyUser = (email, name) => {
        verifyUser(email)
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success(`${name.split(" ")[0]} is verified`)
                }
            })
    }

    return (
        <div>
            <Heading>All Sellers</Heading>
            {
                isLoading ? <Spinner /> :
                    sellers.length < 1 ?
                        <h3 className='text-center text-2xl font-thin'>No Seller Found!</h3>
                        :
                        <div className="overflow-x-auto w-full">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        sellers?.map(user => <tr key={user._id}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={user.image} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{user.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="badge badge-ghost">{user.email}</span>
                                            </td>
                                            <td>
                                                <span className="badge badge-warning badge-sm">{user.role}</span></td>
                                            <th>
                                                {
                                                    user.isVerified ?
                                                        <button className="btn btn-info btn-xs mr-2 text-white" disabled>verify</button>
                                                        :
                                                        <button onClick={() => handleVerifyUser(user.email, user.name)} className="btn btn-info btn-xs mr-2 text-white">verify</button>
                                                }
                                                <button onClick={() => handleDeleteUser(user._id, user.name)} className="btn btn-error btn-xs">delete</button>
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

export default AllSellers;