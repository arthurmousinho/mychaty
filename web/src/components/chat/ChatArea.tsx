import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { UserCard } from "../global/UserCard";
import { ChatMessage } from "./ChatMessage";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Chat, Message, useChat } from "@/hooks/useChat";
import { useToken } from "@/hooks/useToken";
import { User } from "@/hooks/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "@/hooks/useSocket";


export function ChatArea() {

    const [ _, setChat ] = useState<Chat>();
    const [ currentUserId, setCurrentUserId ] = useState('');
    const [ friend, setFriend ] = useState<User>();
    const [ message, setMessage ] = useState('');
    const [ messages, setMessages ] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { getTokenInfos } = useToken();
    const { getChatInfos } = useChat();
    const { id } = useParams(); 
    const {
        emitSendMessageEvent,
        turnOnSendMessageListener,
        turnOffSendMessageListener,
        turnOnChangeUserStatusListener
    } = useSocket();

    const navigate = useNavigate();

    async function loadChatInfos() {
        setMessages([]);
        const chatInfos = await getChatInfos(id || '');

        if (!chatInfos) {
            navigate('/chats', { replace: true });
            return
        };

        setChat(chatInfos);
        setFriend(chatInfos.users.filter(user => user.id !== currentUserId)[0])
        setMessages(chatInfos.messages);
    }

    useEffect(() => {
        const currentUserId = getTokenInfos().sub;
        setCurrentUserId(currentUserId);

        loadChatInfos()

        turnOnSendMessageListener((message: Message) => {
            if (message.chatId !== id) return;
            setMessages((prevMessages) => [...prevMessages, message]);
        })

        turnOnChangeUserStatusListener((userUpdated: User) => {
            setFriend(prevFriend => {
                if (prevFriend && prevFriend.id === userUpdated.id) {
                    return { ...prevFriend, status: userUpdated.status };
                }
                return prevFriend;
            });
        })
      
        return () => {
            turnOffSendMessageListener();
        };

    }, [id]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    function handleSendMessage(event: FormEvent) {
        event.preventDefault();
        if (message.trim() === '') return;
        if (!id) return;

        const newMessage = { 
            content: message, 
            senderId: currentUserId, 
            chatId: id
        };

        emitSendMessageEvent(newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage('');
    }

    return (
        <div className="h-full w-full flex flex-col justify-between rounded bg-slate-50">
            <header className="w-full border-b">
                <UserCard 
                    name={friend?.name || ''}
                    online={friend?.status === 'ONLINE'}
                    avatar={friend?.avatar || ''}
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
                    <div ref={messagesEndRef} />
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