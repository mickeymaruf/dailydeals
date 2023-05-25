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
import ChatInfo from "./ChatInfo";

const Chat = () => {
    const scrollRef = useRef();
    const { user } = useAuth();
    const { data: conversations, isLoading: isConvLoading } = useGetConversationsQuery(user?.email);
    const [currentChat, setCurrentChat] = useState(null);
    const { data: messagesData, isLoading: isMessageLoading } = useGetMessagesQuery(currentChat?._id, { skip: !currentChat?._id });
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
            <div className={`${currentChat?._id && "hidden md:block"} min-h-[90vh] md:h-full col-span-full md:col-span-4 relative`}>
                <h5 className="font-medium p-3 border-b">My Chat</h5>

                {isConvLoading && <ChatSpinner />}

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
            <div className={`${currentChat?._id || "hidden md:block"} col-span-full md:col-span-8 p-3 border-l relative`}>

                {isMessageLoading && <ChatSpinner />}

                {!currentChat?._id
                    ? <div className="flex items-center justify-center h-[71vh]">
                        <h1 className="text-4xl font-logo text-gray-200 text-center">Select a user to continue any conversation</h1>
                    </div>
                    : <>
                        <ChatInfo
                            activeUsers={activeUsers}
                            friendEmail={currentChat.members.find(member => member !== user?.email)}
                            setCurrentChat={setCurrentChat}
                        />
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

const ChatSpinner = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm z-10 flex items-center justify-center">
            <div role="status">
                <svg aria-hidden="true" class="w-10 h-10 animate-spin text-gray-200 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    )
}