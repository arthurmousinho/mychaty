import { ChatArea } from "@/components/chat/ChatArea";
import { UserCard } from "@/components/global/UserCard";
import { WellcomeOptions } from "@/components/global/WellcomeOptions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Chat, Message, useChat } from "@/hooks/useChat";
import { User, UserStatus, useUser } from "@/hooks/useUser";
import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_BASE_URL, {
    transports: ['websocket']
});

export function Chats() {

    const [ chats, setChats ] = useState<Chat[]>([]);
    const [ selectedChat, setSelectedChat ] = useState<Chat>();
    const [ currentUserId, setCurrentUserId ] = useState<string>();
    const [ status, setStatus ] = useState<UserStatus>();

    const { getUserChats } = useChat();
    const { getLoggedUser } = useUser();
    const { toast } = useToast();

    const loadUserChats = useCallback(async () => {
        const userChats = await getUserChats();
        if (!userChats) return;

        userChats.forEach(chat => socket.emit('joinChat', chat.id));
        setChats(userChats);
    }, [ getUserChats ]);

    const loadUser = useCallback(async () => {
        const userInfos = await getLoggedUser();
        if (!userInfos) return;

        setCurrentUserId(userInfos.id);
        setStatus(userInfos.status);
    }, [ getLoggedUser ]);

    const handleChangeStatus = useCallback((newStatus: UserStatus) => {
        const userId = currentUserId;

        if (userId) {
            socket.emit('changeUserStatus', newStatus, userId);
            setStatus(newStatus);
        }
    }, [ currentUserId ]);

    const handleUserStatusChange = useCallback((userUpdated: User) => {
        setChats((prevChats: Chat[]) => {
            return prevChats.map(chat => {
                if (chat.users[0].id === userUpdated.id) {
                    return { ...chat, users: [userUpdated] };
                }
                return chat;
            });
        });
    }, []);

    const handleNewMessageReceived = useCallback(async (message: Message) => {
        if (!currentUserId) {
            await loadUser();
        }

        const notCurrentUserWhoSent = message.sender !== currentUserId;
        const notSelectedChat = message.chatId !== selectedChat?.id;

        console.log(notCurrentUserWhoSent)
        console.log(notSelectedChat)

        if (notCurrentUserWhoSent && notSelectedChat) {
            toast({
                title: `📩 ${message.sender?.name}`,
                variant: 'default',
                description: `${message.content}`
            })
        }

    }, [ currentUserId, selectedChat, loadUser ]);

    useEffect(() => {
        const initialize = async () => {
            await loadUser();
            await loadUserChats();
        };
        initialize();

        socket.on('changeUserStatus', handleUserStatusChange);
        socket.on('sendMessage', handleNewMessageReceived);

        return () => {
            socket.off('changeUserStatus', handleUserStatusChange);
            socket.off('sendMessage', handleNewMessageReceived);
        };
    }, [loadUser, loadUserChats, handleUserStatusChange, handleNewMessageReceived]);

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