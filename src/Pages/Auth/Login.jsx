import React from 'react';
import { Link } from 'react-router-dom';
import SocialAuth from './SocialAuth';

const Login = () => {
    return (
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto my-20">
            <div className="card-body">
                <h1 className="text-3xl font-bold text-accent text-center">Login</h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="text" placeholder="email" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="text" placeholder="password" className="input input-bordered" />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-2">
                    <button className="btn btn-primary">Login</button>
                </div>
                <p className='text-sm text-center'>Don't have an account? <Link to="/register" className='text-info hover:underline'>Create an account</Link></p>
                <div className="divider">OR</div>
                <SocialAuth />
            </div>
        </div>
    );
};

export default Login;