import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import Footer from '../Pages/Shared/Footer';
import Navbar from '../Pages/Shared/Navbar';
import { BsArrowRightSquareFill } from 'react-icons/bs';

const DashboardLayout = () => {
    const { user, userRole } = useAuth();
    return (
        <div>
            <Navbar />
            <div className='max-w-screen-lg mx-auto my-8 border bg-white'>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content p-5 border-l">
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden px-2"><BsArrowRightSquareFill className='w-8 h-8' /></label>
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu menu-compact gap-2 p-5 text-accent w-64 bg-white">
                        {
                            userRole &&
                            <h5 className='border-b pb-2 mb-1 text-xl text-info font-medium'>
                                <span className='capitalize'>{userRole}</span>'s account
                            </h5>
                        }
                        <div className='text-sm text-accent flex items-center gap-3'>
                            <div className="avatar online">
                                <div className="w-12 rounded-full">
                                    <img src={user?.photoURL} />
                                </div>
                            </div>
                            <div>
                                <p>{user?.displayName}</p>
                            </div>
                        </div>
                        <p className='mb-2 text-black font-medium'>Dashboard</p>
                        <div className='bg-base-100 text-black p-1'>
                            {
                                userRole === "buyer" &&
                                <>
                                    <li className='rounded-none'><Link to="/dashboard/myorders">My orders</Link></li>
                                </>
                            }
                            {
                                userRole === "seller" &&
                                <>
                                    <li className='rounded-none'><Link to="/dashboard/myproducts">My Products</Link></li>
                                    <li className='py-1 rounded-none'><Link to="/dashboard/addproduct">Add A Product</Link></li>
                                </>
                            }
                            {
                                userRole === "admin" &&
                                <>
                                    <li className='py-1 rounded-none'><Link to="/dashboard/allsellers">All Sellers</Link></li>
                                    <li className='py-1 rounded-none'><Link to="/dashboard/allbuyers">All Buyers</Link></li>
                                    <li className='rounded-none'><Link to="/dashboard/reporteditems">Reported Items</Link></li>
                                </>
                            }
                        </div>
                    </ul>
                </div>
            </div>
            </div>
        </div>
    );
};

export default DashboardLayout;