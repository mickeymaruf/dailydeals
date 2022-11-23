import React from 'react';
import Advertise from './Advertise';
import Category from './Category'
import Service from './Service';

const Home = () => {
    return (
        <div className="w-9/12 mx-auto bg-white p-10 my-8 border rounded-sm">
            <Advertise />
            <Category />
            <Service />
        </div>
    );
};

export default Home;