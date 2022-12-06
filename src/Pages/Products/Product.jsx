import moment from 'moment';
import React from 'react';
import { ImLocation } from 'react-icons/im';
import { RiPhoneFill } from 'react-icons/ri';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useLoaderData } from 'react-router-dom';

const Product = () => {
    const product = useLoaderData();
    const { _id, category, name, image, price, priceOriginal, contact, location, used, createdAt, sellerName, sellerEmail } = product;
    return (
        <div className="max-w-screen-lg mx-auto bg-white md:my-8 lg:border rounded-sm lg:grid grid-cols-12">
            <div className='col-span-8 p-5'>
                <h1 className='text-2xl font-bold'>{name}</h1>
                <p className='text-sm text-accent mt-1 mb-4'>
                    <span className='mr-1'>Posted on: {moment(createdAt).format("h:mm a")}</span>
                    <span>Location: <ImLocation className='inline w-4 h-4' />{location}</span>
                </p>
                <PhotoProvider>
                    <PhotoView src={image}>
                        <img src={image} alt="" />
                    </PhotoView>
                </PhotoProvider>
                <h1 className='text-2xl font-bold text-primary mt-3'>Tk {price}</h1>
            </div>
            <div className='border-l col-span-4 p-5'>

            </div>


            {/* {
                modalData &&
                <BookingModal product={modalData} setModalData={setModalData} />
            } */}
        </div>
    );
};

export default Product;