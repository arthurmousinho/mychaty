import { FriendCard } from "@/components/friends/FriendCard";
import { NewInviteDialog } from "@/components/invite/NewInviteDialog";
import { EmptyListMessage } from "@/components/text/EmptyListMessage";
import { Heading } from "@/components/text/Heading";
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
                <Heading variant="primary">
                    Manage Friends
                </Heading>
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
            {
                friends.length === 0
                ? <EmptyListMessage /> : <></>
            }
        </div>
    )

}