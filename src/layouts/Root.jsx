import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer';
import Navbar from '../Pages/Shared/Navbar';

const Root = () => {
    return (
        <div>
            <Navbar />
            <div className="w-9/12 mx-auto bg-white p-10 my-8 border rounded-sm">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Root;