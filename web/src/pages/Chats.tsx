import { ChatArea } from "@/components/chat/ChatArea";
import { UserCard } from "@/components/global/UserCard";
import { WellcomeOptions } from "@/components/global/WellcomeOptions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Chat, useChat } from "@/hooks/useChat";
import { useEffect, useState } from "react";

export function Chats() {

    const [ chats, setChats ] = useState<Chat[]>([]);
    const [ selectedChat, setSelectedChat ] = useState<Chat>();

    const { getUserChats } = useChat();

    async function loadUserChats() {
        const userChats = await getUserChats();
        console.log(userChats)
        if (!userChats) return;
        setChats(userChats);
    }

    useEffect(() => {
        loadUserChats()
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
                                <div onClick={() => setSelectedChat(chat)} >
                                    <UserCard 
                                        key={chat.id}
                                        name={chat.users[0].name} 
                                        online={true} 
                                    />
                                </div>
                            )
                        )
                    }
                </div>
                <footer className="border-t p-4">
                    <Select>
                        <SelectTrigger defaultValue="ONLINE">
                            <SelectValue placeholder="Current status" />
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