import React from 'react';
import brand from '../../assets/images/brands/dell.png'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const Category = () => {
    // const swiper = new Swiper('.swiper', {
    //     modules: [Navigation, Pagination],
    // });
    return (
        <div className='py-20'>
            <h1 className='text-2xl font-medium text-center mb-5'>Find Laptop By Categories</h1>
            <Swiper
                spaceBetween={25}
                slidesPerView={5}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                <SwiperSlide>
                    <div class="text-center">
                        <img className='w-56 mb-2' src={brand} alt="" />
                        <h3 className='text-xl font-medium'>DELL</h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="text-center">
                        <img className='w-56 mb-2' src={brand} alt="" />
                        <h3 className='text-xl font-medium'>DELL</h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="text-center">
                        <img className='w-56 mb-2' src={brand} alt="" />
                        <h3 className='text-xl font-medium'>DELL</h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="text-center">
                        <img className='w-56 mb-2' src={brand} alt="" />
                        <h3 className='text-xl font-medium'>DELL</h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="text-center">
                        <img className='w-56 mb-2' src={brand} alt="" />
                        <h3 className='text-xl font-medium'>DELL</h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="text-center">
                        <img className='w-56 mb-2' src={brand} alt="" />
                        <h3 className='text-xl font-medium'>DELL</h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="text-center">
                        <img className='w-56 mb-2' src={brand} alt="" />
                        <h3 className='text-xl font-medium'>DELL</h3>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Category;