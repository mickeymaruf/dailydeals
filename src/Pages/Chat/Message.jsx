import React from 'react';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';

const Message = ({ message, own }) => {
    if (!own) {
        return (
            <div>
                <div className="bg-white p-2 rounded-lg rounded-bl-none border w-fit">
                    {message?.text}
                </div>
                <small className="mt-1 text-sm text-gray-400">Yesterday 9:08 PM</small>
            </div>
        );
    }
    return (
        <div>
            <div className="bg-primary text-white p-2 rounded-lg rounded-br-none w-fit ml-auto">
                {message?.text}
            </div>
            <small className="flex items-center justify-end gap-1 text-right mt-1 text-sm text-gray-400">Yesterday 9:08 PM <IoCheckmarkDoneSharp /></small>
        </div>
    );
};

export default Message;