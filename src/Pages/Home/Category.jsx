import React from 'react';
import brand from '../../assets/images/brands/dell.png'
import Heading from '../../components/Heading';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';

const Category = () => {
    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => axios.get(`${import.meta.env.VITE_APP_API_URL}/categories`)
            .then(data => data.data)
    })

    return (
        <div className='py-20'>
            <Heading>Find Laptop By Categories</Heading>
            <Swiper
                spaceBetween={25}
                slidesPerView={5}
                loop={true}
                breakpoints={{
                    // when window width is >= 0px
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    },
                    // when window width is >= 640px
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 40
                    },
                    // when window width is >= 1200px
                    1200: {
                        slidesPerView: 5,
                    }
                }}
            >
                {
                    isLoading ?
                        <Spinner />
                        :
                        categories.map(category => <SwiperSlide key={category._id}>
                            <div className="text-center">
                                <Link to={`/products/category/${category.slug}`}>
                                    <img className='mb-2 shadow-md prevent-select' src={category.image} alt="" />
                                </Link>
                                <h3 className='text-xl font-medium'>{category.name}</h3>
                            </div>
                        </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Category;