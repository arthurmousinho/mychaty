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
    const [ currentUserId, setCurrentUserId ] = useState<string>();
    const [ status, setStatus ] = useState<UserStatus>();

    const { getUserChats, setCurrentChat } = useChat();
    const { getLoggedUser } = useUser();

    async function loadUserChats()  {
        const userChats = await getUserChats();
        if (!userChats) return;

        userChats.forEach(chat => socket.emit('joinChat', chat.id));
        setChats(userChats);
    };

    async function loadUser() {
        const userInfos = await getLoggedUser();
        if (!userInfos) return;

        setCurrentUserId(userInfos.id);
        setStatus(userInfos.status);
    };

    function handleChangeStatus(newStatus: UserStatus) {
        const userId = currentUserId;

        if (userId) {
            socket.emit('changeUserStatus', newStatus, userId);
            setStatus(newStatus);
        }
    };

    function handleUserStatusChange(userUpdated: User)  {
        setChats((prevChats: Chat[]) => {
            return prevChats.map(chat => {
                if (chat.users[0].id === userUpdated.id) {
                    return { ...chat, users: [userUpdated] };
                }
                return chat;
            });
        });
    };

    function handleSelectChat(chat: Chat) {
        setSelectedChat(chat);
        setCurrentChat(chat);
    }

    useEffect(() => {
        const initialize = async () => {
            await loadUser();
            await loadUserChats();
        };
        initialize();

        socket.on('changeUserStatus', handleUserStatusChange);

        return () => {
            socket.off('changeUserStatus', handleUserStatusChange);
        };
    }, []);

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
                                    onClick={() => handleSelectChat(chat)} 
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