import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SocialAuth from './SocialAuth';
import { useForm } from 'react-hook-form';
import FieldError from '../../components/FieldError';
import { useAuth } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import uploadImage from '../../apis/uploadImage';
import { useJWT } from '../../hooks/useJWT';
import SpinnerSm from '../../components/SpinnerSm';
import { useSaveUserMutation } from '../../features/auth/userApi';

const Register = () => {
    const [saveUser] = useSaveUserMutation();

    const [spinner, setSpinner] = useState(false);
    const { createUser, updateUser, userRoleRefetch } = useAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        setSpinner(true);
        const { name, email, password, picture, role } = data;

        // upload image
        const formData = new FormData();
        formData.append('image', picture[0]);
        uploadImage(formData)
            .then(imageData => {
                if (imageData.status === 200) {
                    const photoURL = imageData.data.url;
                    // create user
                    createUser(email, password)
                        .then(result => {
                            const user = result.user;
                            updateUser(name, photoURL)
                                .then(() => {
                                    // save user to the db
                                    saveUser({
                                        name: user.displayName,
                                        email: user.email,
                                        image: user.photoURL,
                                        role: role
                                    })
                                        .then(userResult => {
                                            if (userResult.insertedId) {
                                                setSpinner(true);
                                                // issue jwt
                                                useJWT(user.email);
                                                navigate("/");
                                                userRoleRefetch();
                                                toast.success("Registration successfull");
                                            }
                                        })
                                        .catch(err => {
                                            toast.error(err.message)
                                            console.log(err);
                                        })
                                })
                        })
                        .catch(err => {
                            setSpinner(false);
                            toast.error(err.message)
                            console.log(err);
                        })
                }
            })
            .catch(err => console.log(err))
        return

    }
    return (
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto my-20">
            <div className="card-body">
                <h1 className="text-3xl font-bold text-accent text-center">Register</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control mb-2">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input {...register("name", { required: "Name is required" })} type="text" placeholder="name" className="input input-bordered" />
                        {
                            errors.name && <FieldError>{errors.name?.message}</FieldError>
                        }
                    </div>
                    <div className="form-control mb-2">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register("email", { required: "Email is required" })} type="text" placeholder="email" className="input input-bordered" />
                        {
                            errors.email && <FieldError>{errors.email?.message}</FieldError>
                        }
                    </div>
                    <div className="form-control mb-2">
                        <label className="label">
                            <span className="label-text">Profile Picture</span>
                        </label>
                        <input {...register("picture", { required: "Picture is required" })} type="file" className="file-input file-input-bordered" />
                        {
                            errors.picture && <FieldError>{errors.picture?.message}</FieldError>
                        }
                    </div>
                    <div className="form-control mb-2">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters of upper" } })} type="text" placeholder="password" className="input input-bordered" />
                        {
                            errors.password && <FieldError>{errors.password?.message}</FieldError>
                        }
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your role</span>
                        </label>
                        <select {...register("role")} className="select select-bordered w-full font-normal">
                            <option value="buyer" selected>Buyer</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>
                    <div className="form-control mt-5">
                        <button className="btn btn-primary">
                            {spinner ? <>Loading <SpinnerSm /></> : 'Register'}
                        </button>
                    </div>
                </form>
                <p className='text-sm text-center'>Already have an account? <Link to="/login" className='text-info hover:underline'>Login</Link></p>
                <div className="divider">OR</div>
                <SocialAuth />
            </div>
        </div>
    );
};

export default Register;