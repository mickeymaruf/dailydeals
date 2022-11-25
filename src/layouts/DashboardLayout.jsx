import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import Footer from '../Pages/Shared/Footer';
import Navbar from '../Pages/Shared/Navbar';

const DashboardLayout = () => {
    const { user } = useAuth();
    return (
        <div>
            <Navbar />
            <div className='max-w-screen-lg mx-auto my-8 border bg-white'>
                <div className="drawer drawer-mobile h-full">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content p-5 border-l">
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                        <Outlet />
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="menu menu-compact gap-2 p-5 text-accent w-64 bg-white">
                            <div className='text-sm text-accent mb-1 border-b pb-2'>
                                <div className="avatar online">
                                    <div className="w-12 rounded-full">
                                        <img src={user?.photoURL} />
                                    </div>
                                </div>
                                <p>{user?.displayName}</p>
                            </div>
                            <p className='mb-2 text-black font-medium'>Dashboard</p>
                            <div className='bg-base-100 text-black p-1'>
                                <li className='rounded-none'><Link to="/dashboard/myorders">My orders</Link></li>
                                <li className='rounded-none'><Link to="/dashboard/myproducts">My Products</Link></li>
                                <li className='py-1 rounded-none'><Link to="/dashboard/addproduct">Add A Product</Link></li>
                                <li className='py-1 rounded-none'><Link to="/dashboard/allsellers">All Sellers</Link></li>
                                <li className='py-1 rounded-none'><Link to="/dashboard/allbuyers">All Buyers</Link></li>
                                <li className='rounded-none'><Link to="/dashboard/addproduct">Reported Items</Link></li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardLayout;