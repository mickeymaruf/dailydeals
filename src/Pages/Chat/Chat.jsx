import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoSendSharp } from "react-icons/io5";
import { io } from 'socket.io-client';
import { useAuth } from "../../contexts/AuthProvider";
import { useGetConversationsQuery, useGetMessagesQuery, usePostMessageMutation } from "../../features/chat/chatApi";
import Conversation from "./Conversation";
import Message from "./Message";

const Chat = () => {
    // const socket = io("http://localhost:5000");

    // useEffect(() => {
    //     // when a user get connected
    //     socket.on('connect', () => {
    //         // console.log("connected");
    //     });

    //     socket.on("message", (msg) => {
    //         console.log(msg);
    //     })
    // }, []);

    const scrollRef = useRef();
    const { user } = useAuth();
    const { data: conversations } = useGetConversationsQuery(user?.email);
    const [currentChat, setCurrentChat] = useState(null);
    const { data: messages } = useGetMessagesQuery(currentChat?._id, { skip: !currentChat?._id });
    const [postMessage, { isSuccess }] = usePostMessageMutation();

    const { handleSubmit, register, reset } = useForm();
    const onSubmit = (data) => {
        try {
            postMessage({
                conversationId: currentChat._id,
                sender: user.email,
                text: data.text
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        isSuccess && reset()
    }, [reset, isSuccess]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages])

    return (
        <div className="max-w-screen-lg mx-auto bg-white md:my-3 lg:border rounded-sm grid grid-cols-12">
            <div className="col-span-4">
                <h5 className="font-medium p-3">My Chat</h5>
                {
                    conversations?.map(conversation => <div onClick={() => setCurrentChat(conversation)}>
                        <Conversation
                            conversation={conversation}
                            user={user}
                        />
                    </div>)
                }
            </div>
            <div className="col-span-8 p-3 border-l">
                <h4 className="p-3 pb-5 border-b mb-5">Mayuko - Chat with</h4>
                <div className="bg-gray-100 rounded-sm border h-[71vh] flex flex-col">
                    <div className="flex-grow space-y-3 p-2 overflow-y-auto">
                        {
                            messages?.map(message => <div ref={scrollRef}>
                                <Message
                                    key={message._id}
                                    message={message}
                                    own={user?.email === message.sender}
                                />
                            </div>)
                        }
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 p-2">
                        <input type="text" {...register("text", { required: true })} className="w-full p-2.5 rounded-full border px-4 outline-none" placeholder="Type your message..." />
                        <button type="submit"><IoSendSharp /></button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chat;