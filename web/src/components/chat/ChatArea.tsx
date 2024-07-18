import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { UserCard } from "../global/UserCard";
import { ChatMessage } from "./ChatMessage";
import { io } from "socket.io-client";
import { FormEvent, useEffect, useState } from "react";
import { Chat } from "@/hooks/useChat";

const socket = io(import.meta.env.VITE_API_BASE_URL);

interface ChatAreaProps {
    chat: Chat;
}

export function ChatArea(props: ChatAreaProps) {

    const [ message, setMessage ] = useState('');

    useEffect(() => {
        const chatId = props.chat.id;
        socket.emit('joinChat', chatId);
    }, [props.chat.id]);

    function handleSendMessage(event: FormEvent) {
        event.preventDefault();

        if (message.trim() === '') return;
        socket.emit('sendMessage', { content: message });
    }

    return (
        <div className="h-full w-full flex flex-col justify-between rounded bg-slate-50">
            <header className="w-full border-b">
                <UserCard 
                    name={ props.chat.users[0].name}
                    online={true}
                />
            </header>
            <div className="p-4 flex-1 overflow-y-auto">
                <div className="flex flex-col space-y-4">
                    <ChatMessage 
                        content="What'up"
                        fromLoggedUser={false}
                    />
                    <ChatMessage 
                        content="Hello"
                        fromLoggedUser={true}
                    />
                </div>
            </div>
            <form className="flex items-center gap-4 p-4 border-t" onSubmit={handleSendMessage}>
                <Input 
                    placeholder="Enter your message..." 
                    onChange={event => setMessage(event.target.value)}
                />
                <Button>
                    <Send size={20} />
                </Button>
            </form>
        </div>
    )
}