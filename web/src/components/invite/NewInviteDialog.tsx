import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { UserCard } from "../global/UserCard";
import { User, useUser } from "@/hooks/useUser";
import { useInvite } from "@/hooks/useInvite";

interface NewInviteDialogProps {
    children: ReactNode;
}

export function NewInviteDialog(props: NewInviteDialogProps) {

    const [ users, setUsers ] = useState<User[]>([]);

    const { createInvite } = useInvite();
    const { searchByName } = useUser();

    async function searchUser(name: string) {
        const usersFound = await searchByName(name);
        if (!usersFound) return;
        setUsers(usersFound);
    }

    

    return (
        <Dialog>
            <DialogTrigger>
                { props.children }
            </DialogTrigger>
            <DialogContent>
                <DialogTitle className="font-bold text-xl">
                    New Invite
                </DialogTitle>
                <DialogDescription>
                    Enter the username to send an invitation
                </DialogDescription>
                <form className="flex items-center flex-col gap-4">
                    <Input 
                        type="text" 
                        placeholder="Search name..."
                        onChange={event => searchUser(event.target.value)}
                    />
                    <ScrollArea className="w-full h-[200px]">
                        {
                            users.map(user => (
                                <div onClick={() => { createInvite(user) }}>
                                    <UserCard 
                                        name={user.name}
                                        online={user.status === 'ONLINE'}
                                    />
                                </div>
                            ))
                        }
                    </ScrollArea>
                </form>
            </DialogContent>
        </Dialog>
    )
}