import React from 'react';

const Heading = ({ children }) => {
    return (
        <div className='text-2xl font-medium text-center mb-10'>
            <p className='border-b-4 border-[#fbbe238d] inline-block pb-px'>{children}</p>
        </div>
    );
};

export default Heading;