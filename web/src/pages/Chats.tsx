import { ChatArea } from "@/components/chat/ChatArea"
import { UserCard } from "@/components/global/UserCard"
import { User, useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react"


export function Chats() {

    const [ friends, setFriends ] = useState<User[]>([]);

    const { getFriends } = useUser();

    async function loadUserFriends() {
        const userFriends = await getFriends();
        if (!userFriends) return;

        console.log(userFriends)
        setFriends(userFriends);
    }

    useEffect(() => {
        loadUserFriends()
    }, []);

    return (
        <div className="flex w-full">
            <aside className="w-[350px] py-4 flex flex-col gap-4 bg-slate-50">
                <header className="w-full px-4">
                    <h1 className="text-xl font-semibold">
                        Chats
                    </h1>
                </header>
                <div className="flex flex-col ml-2 mr-2">
                    {
                        friends.map(
                            friend => (
                                <UserCard 
                                    key={friend.id}
                                    name={friend.name} 
                                    online={true} 
                                />
                            )
                        )
                    }
                </div>
            </aside>
            <ChatArea />
        </div>
    )
}