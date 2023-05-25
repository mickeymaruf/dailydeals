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
import { v4 as uuidv4 } from 'uuid';

const Chat = () => {
    const scrollRef = useRef();
    const { user } = useAuth();
    const { data: conversations } = useGetConversationsQuery(user?.email);
    const [currentChat, setCurrentChat] = useState(null);
    const { data: messagesData } = useGetMessagesQuery(currentChat?._id, { skip: !currentChat?._id });
    const [postMessage] = usePostMessageMutation();
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]);

    useEffect(() => {
        setMessages(messagesData);
    }, [messagesData]);

    const { handleSubmit, register, reset } = useForm();
    const onSubmit = (data) => {
        socket.emit("sendMessage", {
            senderEmail: user.email,
            receiverEmail: currentChat.members?.find(member => member !== user?.email),
            text: data.text
        })

        try {
            const msg = {
                conversationId: currentChat._id,
                sender: user.email,
                text: data.text
            }
            postMessage(msg);
            setMessages(prev => [...prev, msg]);
            reset();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages])

    // socket
    // socket
    // socket

    useEffect(() => {
        setSocket(io(`wss://dailydeals.onrender.com`));

        socket?.on("getMessage", data => {
            console.log(data);
            currentChat?.members?.includes(data.senderEmail) &&
                setMessages(prev => [...prev, {
                    conversationId: currentChat?._id,
                    sender: data.senderEmail,
                    text: data.text
                }]);
        });
    }, [currentChat]);

    useEffect(() => {
        user?.email && socket?.emit("setUser", user?.email);
        socket?.on("getUsers", users => {
            setActiveUsers(users);
        })
    }, [user]);

    return (
        <div className="max-w-screen-lg mx-auto bg-white md:my-3 lg:border rounded-sm grid grid-cols-12">
            <div className="col-span-4">
                <h5 className="font-medium p-3">My Chat</h5>
                {
                    conversations?.map(conversation => <div onClick={() => setCurrentChat(conversation)}>
                        <Conversation
                            conversation={conversation}
                            user={user}
                            activeUsers={activeUsers}
                        />
                    </div>)
                }
            </div>
            <div className="col-span-8 p-3 border-l">
                {!currentChat?._id
                    ? <div className="flex items-center justify-center h-[71vh]">
                        <h1 className="text-4xl font-logo text-gray-200 text-center">Select a user to continue any conversation</h1>
                    </div>
                    : <>
                        <h4 className="p-3 pb-5 border-b mb-5">Mayuko - Chat with</h4>
                        <div className="bg-gray-100 rounded-sm border h-[71vh] flex flex-col">
                            <div id="chat-messages" className="flex-grow space-y-3 p-2 overflow-y-auto">
                                {
                                    messages?.map(message => <div key={uuidv4()} ref={scrollRef}>
                                        <Message
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
                    </>}
            </div>
        </div>
    );
};

export default Chat;