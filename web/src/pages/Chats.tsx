import { ChatArea } from "@/components/chat/ChatArea"
import { UserCard } from "@/components/global/UserCard"
import { WellcomeOptions } from "@/components/global/WellcomeOptions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react"

export function Chats() {

    const [ friends, setFriends ] = useState<User[]>([]);
    const [ selectedFriend, setSelectedFriend ] = useState<User>();

    const { getFriends } = useUser();

    async function loadUserFriends() {
        const userFriends = await getFriends();
        if (!userFriends) return;
        setFriends(userFriends);
    }

    useEffect(() => {
        loadUserFriends()
    }, []);

    return (
        <div className="flex w-full">
            <aside className="w-[350px] py-4 flex flex-col gap-4 bg-slate-50 border-r">
                <header className="w-full px-4">
                    <h1 className="text-xl font-semibold">
                        Chats
                    </h1>
                </header>
                <div className="flex flex-col ml-2 mr-2 h-full">
                    {
                        friends.map(
                            friend => (
                                <div onClick={() => setSelectedFriend(friend)} >
                                    <UserCard 
                                        key={friend.id}
                                        name={friend.name} 
                                        online={true} 
                                    />
                                </div>
                            )
                        )
                    }
                </div>
                <footer className="px-4">
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
                selectedFriend 
                ? <ChatArea user={selectedFriend} />
                : <WellcomeOptions />
            }
        </div>
    )
}