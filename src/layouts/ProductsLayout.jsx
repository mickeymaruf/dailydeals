import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { CategoryContext } from '../contexts/CategoryProvider';
import Footer from '../Pages/Shared/Footer';
import Navbar from '../Pages/Shared/Navbar';

const ProductsLayout = () => {
    const { categories, isLoading } = useContext(CategoryContext);
    return (
        <div>
            <Navbar />
            <div className="max-w-screen-lg mx-auto bg-white my-8 border rounded-sm grid grid-cols-12">
                <div className='border-r col-span-3 p-5'>
                    <p className='text-sm text-accent mb-3 border-b pb-2'>Category</p>
                    <p className='mb-2 font-medium'>All Categories</p>
                    <ul className="menu menu-compact bg-base-100 mt-4">
                        {
                            isLoading ?
                                <progress className="progress progress-primary w-full"></progress>
                                :
                                categories?.map(category => <li key={category._id}>
                                    <Link to={`/products/category/${category.slug}`}>{category.name}</Link>
                                </li>)
                        }
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