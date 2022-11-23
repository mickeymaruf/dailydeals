import React from 'react';
import Heading from '../../components/Heading';

const Advertise = () => {
    return (
        <div className='pt-5'>
            <Heading>Advertisements</Heading>
            <div className='grid grid-cols-2 gap-10'>
                <div className="flex bg-white border border-warning">
                    <figure className='p-3'>
                        <img className='w-56' src="https://sc04.alicdn.com/kf/Hcba7d9a481344c109992f288219753a7b.jpg" alt="Movie" />
                    </figure>
                    <div className="card-body p-3">
                        <h2 className="card-title">New movie is released!</h2>
                        <p>Click the button to watch on Jetflix app.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Watch</button>
                        </div>
                    </div>
                </div>
                <div className="flex bg-white border border-warning">
                    <figure className='p-3'>
                        <img className='w-56' src="https://sc04.alicdn.com/kf/Hcba7d9a481344c109992f288219753a7b.jpg" alt="Movie" />
                    </figure>
                    <div className="card-body p-3">
                        <h2 className="card-title">New movie is released!</h2>
                        <p>Click the button to watch on Jetflix app.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Watch</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Advertise;