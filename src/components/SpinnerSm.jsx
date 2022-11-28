import React from 'react';

const SpinnerSm = () => {
    return (
        <div className="flex items-center justify-center space-x-2 ml-2">
            <div className="w-[6px] h-[6px] rounded-full animate-pulse dark:bg-white"></div>
            <div className="w-[6px] h-[6px] rounded-full animate-pulse dark:bg-white"></div>
            <div className="w-[6px] h-[6px] rounded-full animate-pulse dark:bg-white"></div>
        </div>
    );
};

export default SpinnerSm;