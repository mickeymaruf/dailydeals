import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import logo from '../../assets/images/logo.png'

const Navbar = () => {
    const { user, logOut } = useAuth();
    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err))
    }
    const navLinks = <>
        {
            user &&
            <li className='rounded-lg'><Link to="/dashboard">Dashboard</Link></li>
        }
        <li className='rounded-lg'><Link to="/products">Products</Link></li>
        <li className='rounded-lg'><Link to="/blog">Blog</Link></li>
    </>
    return (
        <div className="bg-primary text-white">
            <div className='navbar max-w-screen-lg mx-auto'>
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52 bg-primary">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to="/" className='flex items-center gap-1'>
                        <img className='w-12' src={logo} alt="" />
                        <h2 className='text-xl font-logo mt-2'>Daily Deals</h2>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <button onClick={handleLogout} className="btn btn-warning">Logout</button>
                            :
                            <Link to="/login"><button className="btn btn-warning">Login</button></Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;