import React, { useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { CategoryContext } from '../../contexts/CategoryProvider';
import Product from './Product';

const Products = () => {
    const { categories, isLoading } = useContext(CategoryContext);
    const products = useLoaderData();

    return (
        <div className="max-w-screen-lg mx-auto bg-white my-8 border rounded-sm grid grid-cols-12">
            <div className='border-r col-span-3 p-5'>
                <p className='text-sm text-accent mb-3 border-b pb-2'>Category</p>
                <p className='mb-2 font-medium'>All Categories</p>
                <ul className="menu menu-compact bg-base-100 mt-4">
                    {
                        isLoading ?
                            <progress className="progress progress-primary w-full"></progress>
                            :
                            <>
                                <li><Link to={`/products`}>All</Link></li>
                                {
                                    categories?.map(category => <li key={category._id}>
                                        <Link to={`/products/category/${category.slug}`}>{category.name}</Link>
                                    </li>)
                                }
                            </>
                    }
                </ul>
            </div>
            <div className='col-span-9 p-5'>
                <div className='grid grid-cols-1 gap-5'>
                    {
                        products.map(product => <Product key={product._id} product={product} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Products;