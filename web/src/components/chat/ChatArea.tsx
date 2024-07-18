import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { UserCard } from "../global/UserCard";
import { ChatMessage } from "./ChatMessage";
import { io } from "socket.io-client";
import { FormEvent, useEffect, useState } from "react";
import { Chat, Message, useChat } from "@/hooks/useChat";
import { useToken } from "@/hooks/useToken";

const socket = io(import.meta.env.VITE_API_BASE_URL, {
    transports: ['websocket']
});

interface ChatAreaProps {
    chat: Chat;
}

export function ChatArea(props: ChatAreaProps) {

    const [ currentUserId, setCurrentUserId ] = useState('');

    const [ message, setMessage ] = useState('');
    const [ messages, setMessages ] = useState<Message[]>([]);

    const { getTokenInfos } = useToken();
    const { getChatInfos } = useChat();

    async function loadChatInfos() {
        setMessages([]);
        const chatInfos = await getChatInfos(props.chat.id);

        if (!chatInfos) return;

        const chatMessages = chatInfos.messages;
        setMessages(chatMessages);
    }

    useEffect(() => {
        const currentUserId = getTokenInfos().sub
        setCurrentUserId(currentUserId);

        loadChatInfos();

        const chatId = props.chat.id;
        socket.emit('joinChat', chatId);

        socket.on('sendMessage', (message: Message) => {
            if (message.chatId !== props.chat.id) return;
            setMessages((prevMessages) => [...prevMessages, message]);
        });
      
        return () => {
            socket.off('sendMessage');
        };

    }, [ props.chat.id ]);

    function handleSendMessage(event: FormEvent) {
        event.preventDefault();
        if (message.trim() === '') return;

        const newMessage = { 
            content: message, 
            senderId: currentUserId, 
            chatId: props.chat.id 
        }

        socket.emit('sendMessage', newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage('');
    }

    return (
        <div className="h-full w-full flex flex-col justify-between rounded bg-slate-50">
            <header className="w-full border-b">
                <UserCard 
                    name={props.chat.users[0].name}
                    online={true}
                />
            </header>
            <div className="p-4 flex-1 overflow-y-auto">
                <div className="flex flex-col space-y-4">
                    {
                        messages?.map(msg => (
                            <ChatMessage 
                                key={msg.id}
                                content={msg.content}
                                fromLoggedUser={msg.senderId === currentUserId}
                            />
                        ))
                    }
                </div>
            </div>
            <form className="flex items-center gap-4 p-4 border-t" onSubmit={handleSendMessage}>
                <Input 
                    placeholder="Enter your message..." 
                    onChange={event => setMessage(event.target.value)}
                    value={message}
                />
                <Button>
                    <Send size={20} />
                </Button>
            </form>
        </div>
    )
}