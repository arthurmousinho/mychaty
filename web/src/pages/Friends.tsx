import { FriendCard } from "@/components/friends/FriendCard";
import { NewInviteDialog } from "@/components/invite/NewInviteDialog";
import { Button } from "@/components/ui/button";
import { User, useUser } from "@/hooks/useUser";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export function Friends() {

    const [ friends, setFriends ] = useState<User[]>([]);

    const { getFriends } = useUser();

    async function loadUserFriends() {
        const userFriends = await getFriends();
        setFriends(userFriends || []);
    }

    function onDeleteFriend(id: string) {
        const friendsUpdated = friends.filter(friend => friend.id !== id);
        setFriends(friendsUpdated);
    }

    useEffect(() => {
        loadUserFriends();
    }, []);

    return (
        <div className="w-full space-y-4">
            <header className="flex items-center justify-between border-b p-4">
                <h1 className="text-2xl font-semibold">Manage Your Friends</h1>
                <NewInviteDialog>
                    <Button className="flex items-center gap-2">
                        <Plus size={20} />
                        Add Friend
                    </Button>
                </NewInviteDialog>
            </header>
            <div className="grid grid-cols-3 gap-4 p-4">
                {
                    friends.map(friend => (
                        <FriendCard 
                            user={friend}
                            onDeleteFn={onDeleteFriend} 
                        />
                    ))
                }
            </div>
        </div>
    )

}