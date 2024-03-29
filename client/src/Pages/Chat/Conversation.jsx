import { useGetUserQuery } from "../../features/auth/userApi";
import { MdVerified } from 'react-icons/md';

const Conversation = ({ conversation, user, activeUsers }) => {
    const friendEmail = conversation.members.find(member => member !== user?.email);
    const { data: friend } = useGetUserQuery(friendEmail, { skip: !friendEmail });

    return (
        <div className="py-3 px-6 flex items-start gap-3 hover:bg-gray-100 border-b cursor-pointer">
            <div className="relative">
                <img className="w-12 h-12 object-cover rounded-full" src={friend?.image} alt="" />
                {
                    activeUsers.find(usr => usr.userEmail === friend?.email) &&
                    <div className="w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0 border-2 border-white -translate-x-0.5 -translate-y-0.5"></div>
                }
            </div>
            <div className="flex flex-col">
                <div className='text-sm mt-1'>
                    <span className="font-medium">{friend?.name}</span>
                    {
                        friend?.isVerified &&
                        <div className="tooltip tooltip-right tooltip-info text-white" data-tip="Verified">
                            <MdVerified className='inline text-info w-4 h-4 ml-1' />
                        </div>
                    }
                </div>
                <small>role: {friend?.role}</small>
                <small className="text-gray-500">{friend?.email}</small>
                <small className="text-gray-500">Just Now</small>
            </div>
        </div>
    );
};

export default Conversation;