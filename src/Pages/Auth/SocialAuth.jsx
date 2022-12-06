import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider } from "firebase/auth";
import { useAuth } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveUser } from '../../apis/users';
import { useJWT } from '../../hooks/useJWT';

const googleProvider = new GoogleAuthProvider();

const SocialAuth = () => {
    const { providerLogin, userRoleRefetch } = useAuth();
    const navigate = useNavigate();
    const handleProviderLogin = () => {
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                // check either the user is exist or not in the db
                fetch(`${import.meta.env.VITE_APP_API_URL}/userIsExist?email=${user.email}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(user.photoURL);
                        if (!data.isExist) {
                            // save user to the db if the user is not exist
                            saveUser({
                                name: user.displayName,
                                email: user.email,
                                image: user.photoURL,
                                role: "buyer"
                            })
                                .then(userResult => {
                                    if (userResult.insertedId) {
                                        navigate("/");
                                        userRoleRefetch();
                                        toast.success("Registration successfull");
                                    }
                                })
                                .catch(err => {
                                    toast.error(err.message)
                                    console.log(err);
                                })
                        }
                        // issue jwt
                        useJWT(user.email);
                    })
                navigate("/");
            })
            .catch(err => {
                toast.error(err.message);
                console.log(err);
            })
    }
    return (
        <div>
            <div onClick={handleProviderLogin} className='border w-full rounded-full text-center font-medium bg-white py-3 cursor-pointer relative'>
                <FcGoogle className='w-[44px] h-[44px] absolute left-1 top-1/2 -translate-y-1/2' />
                Login with Google
            </div>
        </div>
    );
};

export default SocialAuth;