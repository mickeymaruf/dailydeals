import React, { useContext } from 'react';
import Heading from '../../components/Heading';
import { Swiper, SwiperSlide } from 'swiper/react';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { CategoryContext } from '../../contexts/CategoryProvider';

const Category = () => {
    const { categories, isLoading } = useContext(CategoryContext);
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
                        categories?.map(category => <SwiperSlide key={category._id}>
                            <div className="text-center">
                                <Link to={`/category/${category.slug}`}>
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