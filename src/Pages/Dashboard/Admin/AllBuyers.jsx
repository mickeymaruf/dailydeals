import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Heading from '../../../components/Heading';

const AllBuyers = () => {
    const { data: buyers = [], refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: () => fetch(`${import.meta.env.VITE_APP_API_URL}/users?role=buyer`)
            .then(res => res.json())
    })

    const handleDeleteUser = (id, name) => {
        const confirmDelete = confirm(`Are your sure want to delete ${name}`);
        if (confirmDelete) {
            fetch(`${import.meta.env.VITE_APP_API_URL}/users/${id}`, {
                method: 'DELETE',
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('DAILY_DEALS_ACCESS_TOKEN')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        refetch()
                        toast.success(`${name} deleted`)
                    }
                })
        }
    }

    return (
        <div>
            <Heading>All Buyers</Heading>
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
                            buyers.map(user => <tr key={user._id}>
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
                                    <button onClick={() => handleDeleteUser(user._id, user.name)} className="btn btn-error btn-xs">delete</button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyers;