import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer';
import Navbar from '../Pages/Shared/Navbar';

const ProductsLayout = () => {
    return (
        <div>
            <Navbar />
            <div className="w-9/12 mx-auto bg-white my-8 border rounded-sm grid grid-cols-12">
                <div className='border-r col-span-3 p-5'>
                    <p className='text-sm text-accent mb-3'>Category</p>
                    <p className='mb-2 font-medium'>All Categories</p>
                    <ul className="menu menu-compact bg-base-100 mt-4">
                        <li><a>Lenevo</a></li>
                        <li><a>Dell</a></li>
                        <li><a>HP</a></li>
                        <li><a>Lenevo</a></li>
                        <li><a>Dell</a></li>
                        <li><a>HP</a></li>
                        <li><a>Lenevo</a></li>
                    </ul>
                </div>
                <div className='col-span-9 p-5'>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductsLayout;