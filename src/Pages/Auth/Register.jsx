import React from 'react';
import { Link } from 'react-router-dom';
import SocialAuth from './SocialAuth';

const Register = () => {
    return (
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto my-20">
            <div className="card-body">
                <h1 className="text-3xl font-bold text-accent text-center">Register</h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="name" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="text" placeholder="email" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Profile Picture</span>
                    </label>
                    <input type="file" className="file-input file-input-bordered w-full" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="text" placeholder="password" className="input input-bordered" />
                </div>
                <div className='flex gap-3'>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <input type="radio" name="radio-10" className="radio checked:bg-accent" checked />
                            <span className="label-text ml-2">Buyer</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <input type="radio" name="radio-10" className="radio checked:bg-info" />
                            <span className="label-text ml-2">Seller</span>
                        </label>
                    </div>
                </div>
                <div className="form-control mt-4">
                    <button className="btn btn-primary">Register</button>
                </div>
                <p className='text-sm text-center'>Already have an account? <Link to="/login" className='text-info hover:underline'>Login</Link></p>
                <div className="divider">OR</div>
                <SocialAuth />
            </div>
        </div>
    );
};

export default Register;