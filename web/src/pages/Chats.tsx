import { ChatArea } from "@/components/chat/ChatArea";
import { UserCard } from "@/components/global/UserCard";
import { WellcomeOptions } from "@/components/global/WellcomeOptions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Chat, useChat } from "@/hooks/useChat";
import { User, UserStatus, useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_BASE_URL, {
    transports: ['websocket']
});

export function Chats() {

    const [ chats, setChats ] = useState<Chat[]>([]);
    const [ selectedChat, setSelectedChat ] = useState<Chat>();
    
    const [ currentUserId, setCurrentUserId ] = useState<string>()
    const [ status, setStatus ] = useState<UserStatus>();

    const { getUserChats } = useChat();
    const { getLoggedUser } = useUser();

    async function loadUserChats() {
        const userChats = await getUserChats();
        if (!userChats) return;

        userChats.map(chat => socket.emit('joinChat', chat.id));
        setChats(userChats);
    }

    async function loadUser() {
        const userInfos = await getLoggedUser();

        if (!userInfos) return;

        setCurrentUserId(userInfos.id);
        setStatus(userInfos.status);
    }

    function handleChangeStatus(newStatus: UserStatus) {
        const status = newStatus;
        const userId = currentUserId;
        
        socket.emit('changeUserStatus', status, userId);
        setStatus(newStatus);
    }

    function handleUserStatusChange(userUpdated: User) {
        setChats((prevChats: Chat[]) => {
            const chatsUpdated = prevChats.map(chat => {
                if (chat.users[0].id === userUpdated.id) {
                    const chatUpdated =  { ...chat, users: [ userUpdated ] }
                    return chatUpdated;
                }
                return chat;
            });
            return chatsUpdated;
        });
    };

    useEffect(() => {
        loadUser();
        loadUserChats();
    
        socket.on('changeUserStatus', handleUserStatusChange);
    
        return () => {
            socket.off('changeUserStatus', handleUserStatusChange);
        };
    }, []);

    useEffect(() => {
        if (selectedChat) {
            const updatedChat = chats.find(chat => chat.id === selectedChat.id);
            if (updatedChat) {
                setSelectedChat(updatedChat);
            }
        }
    }, [chats]);

    return (
        <div className="flex w-full">
            <aside className="w-[350px] pt-4 flex flex-col gap-4 bg-slate-50 border-r">
                <header className="w-full px-4">
                    <h1 className="text-xl font-semibold">
                        Chats
                    </h1>
                </header>
                <div className="flex flex-col ml-2 mr-2 h-full">
                    {
                        chats.map(
                            chat => (
                                <div 
                                    onClick={() => setSelectedChat(chat)} 
                                    key={chat.id}
                                >
                                    <UserCard 
                                        name={chat.users[0].name} 
                                        online={chat.users[0].status === 'ONLINE'} 
                                    />
                                </div>
                            )
                        )
                    }
                </div>
                <footer className="border-t p-4">
                    {
                        status && 
                        <Select 
                            defaultValue={status} 
                            onValueChange={handleChangeStatus}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select your status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ONLINE" className="cursor-pointer">
                                    Online
                                </SelectItem>
                                <SelectItem value="OFFLINE" className="cursor-pointer">
                                    Offline
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    }
                </footer>
            </aside>
            {
                selectedChat 
                ? <ChatArea chat={selectedChat} />
                : <WellcomeOptions />
            }
        </div>
    )
}