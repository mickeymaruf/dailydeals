import React from 'react';
import brand from '../../assets/images/brands/dell.png'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import Heading from '../../components/Heading';

const Category = () => {
    // const swiper = new Swiper('.swiper', {
    //     modules: [Navigation, Pagination],
    // });
    return (
        <div className='py-20'>
            <Heading>Find Laptop By Categories</Heading>
            <Swiper
                spaceBetween={25}
                slidesPerView={5}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
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
                <SwiperSlide>
                    <div class="text-center">
                        <img className='mb-2 shadow-md' src={brand} alt="" />
                        <h3 className='text-xl font-medium'>DELL</h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="text-center">
                        <img className='mb-2 shadow-md' src={brand} alt="" />
                        <h3 className='text-xl font-medium'>DELL</h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="text-center">
                        <img className='mb-2 shadow-md' src={brand} alt="" />
                        <h3 className='text-xl font-medium'>DELL</h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="text-center">
                        <img className='mb-2 shadow-md' src={brand} alt="" />
                        <h3 className='text-xl font-medium'>DELL</h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="text-center">
                        <img className='mb-2 shadow-md' src={brand} alt="" />
                        <h3 className='text-xl font-medium'>DELL</h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="text-center">
                        <img className='mb-2 shadow-md' src={brand} alt="" />
                        <h3 className='text-xl font-medium'>DELL</h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="text-center">
                        <img className='mb-2 shadow-md' src={brand} alt="" />
                        <h3 className='text-xl font-medium'>DELL</h3>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Category;