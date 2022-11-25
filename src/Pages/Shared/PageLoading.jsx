import React from 'react';
import Spinner from '../../components/Spinner';

const PageLoading = () => {
    return (
        <div className='h-screen flex items-center justify-center'>
            <Spinner></Spinner>
        </div>
    );
};

export default PageLoading;