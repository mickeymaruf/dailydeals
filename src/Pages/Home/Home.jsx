import React from 'react';
import Advertise from './Advertise';
import Category from './Category'
import Service from './Service';

const Home = () => {
    return (
        <div className="max-w-screen-lg mx-auto bg-white p-10 my-8 border rounded-sm">
            <Advertise />
            <Category />
            <Service />
        </div>
    );
};

export default Home;