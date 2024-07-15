import { ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { UserCard } from "../global/UserCard";

const invites = [
    {
        name: 'Diego Fernandes'
    },
    {
        name: 'Mayk Brito'
    },
    {
        name: 'Daniel Castro'
    },
    {
        name: 'Matheus Fraga'
    },
    {
        name: 'Vinícius Barbosa'
    },
    {
        name: 'Arthur Mousinho'
    },
]

interface NewInviteDialogProps {
    children: ReactNode;
}

export function NewInviteDialog(props: NewInviteDialogProps) {
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
                    />
                    <ScrollArea className="w-full h-[200px]">
                        {
                            invites.map(invite => (
                                <UserCard 
                                    name={invite.name}
                                    online={true}
                                />
                            ))
                        }
                    </ScrollArea>
                </form>
            </DialogContent>
        </Dialog>
    )
}