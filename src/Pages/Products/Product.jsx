import React from 'react';
import { ImLocation } from 'react-icons/im';
import { MdVerified } from 'react-icons/md';
import { RiPhoneFill } from 'react-icons/ri';
import moment from 'moment';
import { useAuth } from '../../contexts/AuthProvider';

const Product = ({ product, setModalData }) => {
    const { user } = useAuth();
    const { category, name, image, price, priceOriginal, contact, location, used, createdAt, sellerName, sellerEmail } = product;
    return (
        <div className="flex bg-white border border-warning">
            <figure className='p-3'>
                <img className='w-72 h-full object-cover' src={image} alt={name} />
            </figure>
            <div className="p-3 pl-1 flex justify-between items-end w-full">
                <div>
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
                    <div className="badge badge-primary badge-outline">Seller</div>
                    <div className='text-sm text-accent mt-1'>
                        {sellerName}
                        <div className="tooltip tooltip-right tooltip-info text-white" data-tip="Verified">
                            <MdVerified className='inline text-info w-4 h-4 ml-1' />
                        </div>
                    </div>
                    <p className='text-sm text-accent mt-1'>
                        <ImLocation className='inline w-4 h-4' />{location} - <RiPhoneFill className='inline w-4 h-4' />{contact}
                    </p>
                    <p className='text-primary font-medium'>Resale Price: {price} TK</p>
                    <p className='text-primary font-medium'>Original Price: {priceOriginal} TK</p>
                    <p className='text-sm text-accent'>Used: {used} Year{used > 1 && 's'}</p>
                    <p className='text-sm text-accent'>Posted at: {moment(createdAt).format("h:mm a")}</p>
                </div>
                {
                    user?.email === sellerEmail ?
                        <p className='text-xs'>You can't book your own product</p>
                        :
                        <label onClick={() => setModalData(product)} htmlFor="bookingModal" className="btn btn-primary">Book Now</label>
                }
            </div>
        </div>
    );
};

export default Product;