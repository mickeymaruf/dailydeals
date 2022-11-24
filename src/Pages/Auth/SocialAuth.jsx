import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const SocialAuth = () => {
    return (
        <div>
            <div className='border w-full rounded-full text-center font-medium bg-white py-3 cursor-pointer relative'>
                <FcGoogle className='w-[44px] h-[44px] absolute left-1 top-1/2 -translate-y-1/2' />
                Login with Google
            </div>
        </div>
    );
};

export default SocialAuth;