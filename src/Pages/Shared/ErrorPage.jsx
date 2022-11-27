import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { Link, useRouteError } from 'react-router-dom';
import errorGIF from '../../assets/gifs/error.gif'

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className='h-screen flex justify-center items-center gap-10'>
            <img className='w-96' src={errorGIF} alt="" />
            <div>
                <h1 className="text-8xl font-medium">4<span className='text-primary'>0</span>4</h1>
                <h2 className='text-4xl font-medium mt-2 mb-4'>{error.statusText || error.message}</h2>
                <Link to="/">
                    <BiArrowBack className='w-10 h-10 mx-auto bg-base-200 hover:bg-base-300 p-1 rounded-full cursor-pointer' />
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;