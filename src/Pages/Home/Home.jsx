import React from 'react';
import Advertise from './Advertise';
import Category from './Category'
import Service from './Service';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper';

const Home = () => {
    return (
        <div className='max-w-screen-lg mx-auto'>
            <div className='bg-white prevent-select'>
                <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    spaceBetween={25}
                    centeredSlides={true}
                    slidesPerView={3}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    initialSlide={1}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    className="mySwiper"
                    navigation={true}
                    loop={true}
                    breakpoints={{
                        // when window width is >= 0px
                        0: {
                            slidesPerView: 2,
                            spaceBetween: 5
                        },
                        // when window width is >= 640px
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 10
                        },
                        // when window width is >= 1200px
                        1200: {
                            spaceBetween: 25
                        }
                    }}
                >
                    <SwiperSlide>
                        <div className='relative'>
                            <div className='absolute font-thin top-1/2 -translate-y-1/2 left-5 md:left-8 md:pr-5 text-white'>
                                <h2 className='text-2xl md:text-3xl'>Sharon Van Etten</h2>
                                <p className='text-xs'>Everything will be okay. I have a sticker on my laptop that says that.</p>
                            </div>
                            <img src="https://images.unsplash.com/photo-1586077427825-15dca6b44dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bGFwdG9wc3xlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='relative'>
                            <div className='absolute font-thin top-1/2 -translate-y-1/2 left-5 md:left-8 pr-5 text-white'>
                                <h2 className='text-2xl md:text-3xl'>Joanne Harris</h2>
                                <p className='text-xs'>I can write absolutely anywhere. All I need is a laptop.</p>
                            </div>
                            <img src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bGFwdG9wc3xlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='relative'>
                            <div className='absolute font-thin top-1/2 -translate-y-1/2 left-5 md:left-8 pr-5 text-white'>
                                <h2 className='text-2xl md:text-3xl'>Natalie Massenet</h2>
                                <p className='text-xs'>I borrowed a creaky laptop from my husband, went into the web, and never came back.</p>
                            </div>
                            <img src="https://images.unsplash.com/photo-1601342631712-1e491a7e7c30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGxhcHRvcHN8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='relative'>
                            <div className='absolute font-thin top-1/2 -translate-y-1/2 left-5 md:left-8 pr-5 text-white'>
                                <h2 className='text-2xl md:text-3xl'>Nelson Mandela</h2>
                                <p className='text-xs'>You can sit in a room and create anything you want on a laptop. That's why the real con men are gone.</p>
                            </div>
                            <img src="https://images.unsplash.com/photo-1519408469771-2586093c3f14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGxhcHRvcHN8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='relative'>
                            <div className='absolute font-thin top-1/2 -translate-y-1/2 left-5 md:left-8 pr-5 text-white'>
                                <h2 className='text-2xl md:text-3xl'>David Guetta</h2>
                                <p className='text-xs'>I can make everything I do come from my laptop. Even when I go to a big studio.</p>
                            </div>
                            <img src="https://images.unsplash.com/photo-1534029731425-0d646dd67df3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fGxhcHRvcHN8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='relative'>
                            <div className='absolute font-thin top-1/2 -translate-y-1/2 left-5 md:left-8 pr-5 text-white'>
                                <h2 className='text-2xl md:text-3xl'>James Rollins</h2>
                                <p className='text-xs'>I work on a laptop specifically so I can work in cafes and pretend I'm part of the human world.</p>
                            </div>
                            <img src="https://images.unsplash.com/photo-1558634278-a323e022675f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGxhcHRvcHN8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="bg-white p-10 pt-8 my-8 border rounded-sm">
                <Advertise />
                <Category />
                <Service />
            </div>
        </div>
    );
};

export default Home;