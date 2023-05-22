import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { CategoryContext } from '../../contexts/CategoryProvider';
import { useGetProductsQuery } from '../../features/product/productApi';
import BookingModal from './BookingModal';
import ProductCard from './ProductCard';

const Products = () => {
    const { slug } = useParams();
    console.log(slug);
    const { data: products, isLoading: isProductsLoading } = useGetProductsQuery(slug || '');
    const { categories, isLoading } = useContext(CategoryContext);
    const [modalData, setModalData] = useState(null);

    return (
        <div className="max-w-screen-lg mx-auto bg-white md:my-8 lg:border rounded-sm lg:grid grid-cols-12">
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
                                        <Link to={`/category/${category.slug}`}>{category.name}</Link>
                                    </li>)
                                }
                            </>
                    }
                </ul>
            </div>
            <div className='col-span-8 p-5'>
                <div className='grid grid-cols-1 gap-5'>
                    {
                        isProductsLoading ? <Spinner /> :
                            products?.length < 1 ?
                                <h3 className='text-center text-2xl font-thin'>Nothing's found!</h3>
                                :
                                products?.map(product => <ProductCard key={product._id} product={product} setModalData={setModalData} />)
                    }
                </div>
            </div>

            {
                modalData &&
                <BookingModal product={modalData} setModalData={setModalData} />
            }
        </div>
    );
};

export default Products;