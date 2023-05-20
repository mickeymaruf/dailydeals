import { IoSendSharp } from "react-icons/io5";

const Chat = () => {
    return (
        <div className="max-w-screen-lg mx-auto bg-white md:my-3 lg:border rounded-sm grid grid-cols-12">
            <div className="col-span-4">
                <h5 className="font-medium p-3">My Chat</h5>
                <div className="py-3 px-6 flex items-start gap-3 bg-gray-100">
                    <img className="w-12 rounded-full" src="https://i.bikroy-st.com/3b65c3e7-65fd-45b1-9762-275d335883fa/132/132/cropped.jpg" alt="" />
                    <div className="flex flex-col">
                        <p>Vvip Sim Card</p>
                        <small>017119X8484 GP NEW VIP SIM</small>
                        <small className="text-gray-500">test</small>
                        <small className="text-gray-500">Just Now</small>
                    </div>
                </div>
            </div>
            <div className="col-span-8 p-3 border-l">
                <h4 className="p-3 pb-5 border-b mb-5">Vvip Sim Card-এর সাথে চ্যাট করুন</h4>
                <div className="bg-gray-100 p-2 rounded-sm border h-[71vh] flex flex-col">
                    <div className="flex-grow">Message should be go here</div>
                    <div className="mt-40 flex items-center gap-2">
                        <input type="text" className="w-full p-2.5 rounded-full border px-4 outline-none" placeholder="Type your message..." />
                        <IoSendSharp />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;