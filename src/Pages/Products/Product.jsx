import React, { useEffect, useState } from 'react';
import { ImLocation } from 'react-icons/im';
import { MdVerified } from 'react-icons/md';
import { RiPhoneFill } from 'react-icons/ri';
import moment from 'moment';
import { useAuth } from '../../contexts/AuthProvider';
import { MdReportGmailerrorred } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useIsVerified } from '../../hooks/useIsVerified';

const Product = ({ product, setModalData }) => {
    const [sellerIsVerified, setSellerIsVerified] = useState(null);
    const { user, userRole } = useAuth();
    const { _id, category, name, image, price, priceOriginal, contact, location, used, createdAt, sellerName, sellerEmail } = product;

    useEffect(() => {
        useIsVerified(sellerEmail)
            .then(data => setSellerIsVerified(data));
    }, [sellerEmail])

    // report to admin
    const reportToAdmin = () => {
        fetch(`${import.meta.env.VITE_APP_API_URL}/products/report/${_id}?email=${user.email}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem('DAILY_DEALS_ACCESS_TOKEN')}`
            },
            body: JSON.stringify({ name, image })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    toast.success('Reported successfully');
                } else {
                    toast.error('Already reported');
                }
            })
    }

    return (
        <div className='flex flex-col md:flex-row bg-white border border-warning rounded relative'>
            <figure className='p-3'>
                <img className='w-72 mx-auto h-full object-cover' src={image} alt={name} />
            </figure>
            <div className="p-3 pt-0 md:p-3 md:pl-1 flex justify-between items-end w-full">
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
                    <div className="badge badge-primary badge-outline">{category}</div>
                    <div className='text-sm text-accent mt-1'>
                        {sellerName}
                        {
                            sellerIsVerified &&
                            <div className="tooltip tooltip-right tooltip-info text-white" data-tip="Verified">
                                <MdVerified className='inline text-info w-4 h-4 ml-1' />
                            </div>
                        }
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
            <div className='absolute top-0 right-0'>
                <button onClick={reportToAdmin} className='btn p-0 min-h-fit h-fit bg-inherit border-0 hover:bg-inherit'>
                    <MdReportGmailerrorred className='h-7 w-7 m-px text-red-500' />
                </button>
            </div>
        </div>
    );
};

export default Product;