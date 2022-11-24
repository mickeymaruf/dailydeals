import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider } from "firebase/auth";
import { useAuth } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';

const googleProvider = new GoogleAuthProvider();

const SocialAuth = () => {
    const { providerLogin } = useAuth();
    const handleProviderLogin = () => {
        providerLogin(googleProvider)
            .then(result => {
                // 
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