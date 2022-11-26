import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { ImLocation } from 'react-icons/im';
import { MdVerified } from 'react-icons/md';
import Heading from '../../components/Heading';
import Spinner from '../../components/Spinner';
import moment from 'moment';

const Advertise = () => {
    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        refetchOnWindowFocus: false,
        queryFn: () => axios.get(`${import.meta.env.VITE_APP_API_URL}/advertisedProducts`)
            .then(data => data.data)
    })

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='pt-5'>
            <Heading>Advertisements</Heading>
            <div className='grid grid-cols-2 gap-10'>
                {
                    products.map(product => <AdvertisedProduct key={product._id} product={product} />)
                }
            </div>
        </div>
    );
};

const AdvertisedProduct = ({ product }) => {
    const { category, name, image, price, priceOriginal, contact, location, used, createdAt, sellerName, sellerEmail } = product;
    return (
        <div className="flex bg-pink-50 border border-warning rounded relative">
            <figure className='p-2 w-48'>
                <img className='w-full h-40 object-cover object-center rounded' src={image} alt="Movie" />
            </figure>
            <div className="p-2 pl-1">
                <h2 className="card-title">
                    {
                        name.length > 27 ?
                            <div className="tooltip tooltip-bottom" data-tip={name}>
                                {name.slice(0, 27) + '...'}
                            </div>
                            :
                            name
                    }
                </h2>
                <div className="badge badge-primary badge-outline">{category}</div>
                <div className='text-sm text-accent mt-1'>
                    {sellerName}
                    <div className="tooltip tooltip-right tooltip-info text-white" data-tip="Verified">
                        <MdVerified className='inline text-info w-4 h-4 ml-1' />
                    </div>
                </div>
                <p className='text-xs text-accent mt-1'>
                    <ImLocation className='inline w-4 h-4' />{location}
                </p>
                <p className='text-primary font-medium'>Price: {price} TK</p>
                <p className='text-sm text-accent'>Used: {used} Year{used > 1 && 's'}</p>
                <p className='text-sm text-accent'>Posted at: {moment(createdAt).format("h:mm a")}</p>
            </div>
            <p className='absolute top-0 right-0 bg-red-200 font-bold rounded-tr px-2'>AD</p>
        </div>
    )
}

export default Advertise;