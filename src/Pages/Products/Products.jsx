import React from 'react';
import { ImLocation } from 'react-icons/im';
import { MdVerified } from 'react-icons/md';

const Products = () => {
    return (
        <div className='grid grid-cols-1 gap-5'>
            <div className="flex bg-white border border-warning">
                <figure className='p-3'>
                    <img className='w-64 h-full' src="https://sc04.alicdn.com/kf/Hcba7d9a481344c109992f288219753a7b.jpg" alt="Movie" />
                </figure>
                <div className="p-3 pl-1 flex justify-between items-end w-full">
                    <div>
                        <h2 className="card-title">HP Elite 840 G2</h2>
                        <div className="badge badge-primary badge-outline">Seller</div>
                        <div className='text-sm text-accent mt-1'>
                            Maruf Hossain
                            <div className="tooltip tooltip-right tooltip-info text-white" data-tip="Verified">
                                <MdVerified className='inline text-info w-4 h-4 ml-1' />
                            </div>
                        </div>
                        <p className='text-sm text-accent mt-1'><ImLocation className='inline w-4 h-4' /> Dhaka</p>
                        <p className='text-primary font-medium'>Resale Price: 7000TK</p>
                        <p className='text-primary font-medium'>Original Price: 14000TK</p>
                        <p className='text-sm text-accent'>Used: 3 Years</p>
                        <p className='text-sm text-accent'>Posted at: 11:49 AM</p>
                    </div>
                    <button className="btn btn-primary">Book Now</button>
                </div>
            </div>
            <div className="flex bg-white border border-warning">
                <figure className='p-3'>
                    <img className='w-64 h-full' src="https://sc04.alicdn.com/kf/Hcba7d9a481344c109992f288219753a7b.jpg" alt="Movie" />
                </figure>
                <div className="p-3 pl-1 flex justify-between items-end w-full">
                    <div>
                        <h2 className="card-title">HP Elite 840 G2</h2>
                        <div className="badge badge-primary badge-outline">Seller</div>
                        <div className='text-sm text-accent mt-1'>
                            Maruf Hossain
                            <div className="tooltip tooltip-right tooltip-info text-white" data-tip="Verified">
                                <MdVerified className='inline text-info w-4 h-4 ml-1' />
                            </div>
                        </div>
                        <p className='text-sm text-accent mt-1'><ImLocation className='inline w-4 h-4' /> Dhaka</p>
                        <p className='text-primary font-medium'>Resale Price: 7000TK</p>
                        <p className='text-primary font-medium'>Original Price: 14000TK</p>
                        <p className='text-sm text-accent'>Used: 3 Years</p>
                        <p className='text-sm text-accent'>Posted at: 11:49 AM</p>
                    </div>
                    <button className="btn btn-primary">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default Products;