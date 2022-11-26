import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import SocialAuth from './SocialAuth';
import { useForm } from 'react-hook-form';
import FieldError from '../../components/FieldError';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useJWT } from '../../hooks/useJWT';

const Login = () => {
    const { login } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        login(data.email, data.password)
            .then(result => {
                const user = result.user;
                // issue jwt
                useJWT(user.email);
                navigate(from, { replace: true });
            })
            .catch(err => {
                toast.error(err.message)
                console.log(err);
            });
    }
    return (
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto my-20">
            <div className="card-body">
                <h1 className="text-3xl font-bold text-accent text-center">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register("email", { required: "Email is required" })} type="text" placeholder="email" className="input input-bordered" />
                        {
                            errors.email && <FieldError>{errors.email?.message}</FieldError>
                        }
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register("password", { required: "Password is required" })}
                            type="password" placeholder="password" className="input input-bordered" />
                        {
                            errors.password && <FieldError>{errors.password?.message}</FieldError>
                        }
                        <label className="label mt-2">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-2">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
                <p className='text-sm text-center'>Don't have an account? <Link to="/register" className='text-info hover:underline'>Create an account</Link></p>
                <div className="divider">OR</div>
                <SocialAuth />
            </div>
        </div>
    );
};

export default Login;