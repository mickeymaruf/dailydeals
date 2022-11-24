import React from 'react';

const FieldError = ({ children }) => {
    return <p className='text-error text-sm mt-2'>{children}</p>
};

export default FieldError;