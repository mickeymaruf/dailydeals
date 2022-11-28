import React from 'react';

const Spinner = () => {
    return (
        <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 rounded-full animate-pulse bg-warning"></div>
            <div className="w-4 h-4 rounded-full animate-pulse bg-warning"></div>
            <div className="w-4 h-4 rounded-full animate-pulse bg-warning"></div>
        </div>
    );
};

export default Spinner;