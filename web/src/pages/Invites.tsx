import { InviteCard } from "@/components/invite/InviteCard";
import { NewInviteDialog } from "@/components/invite/NewInviteDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const invites = [
    {
        name: 'Diego Fernandes',
    },
    {
        name: 'Mayk Brito',
    },
    {
        name: 'Daniel Castro',
    },
    {
        name: 'Matheus Fraga',
    },
    {
        name: 'Vinícius Barbosa',
    },
    {
        name: 'Arthur Mousinho',
    },
]

export function Invites() {
    return (
        <div className="m-10 w-full space-y-4">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">
                    Manage Your Invites
                </h1>
                <div className="flex items-center gap-4">   
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter invites" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem 
                                value="received" 
                                className="cursor-pointer"
                            >
                                Received Invites
                            </SelectItem>
                            <SelectItem 
                                value="sent" 
                                className="cursor-pointer"
                            >
                                Sent Invites
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <NewInviteDialog>
                        <Button className="flex items-center gap-2">
                            <Plus size={20} />
                            Send Invite
                        </Button>
                    </NewInviteDialog>
                </div>
            </header>
            <div className="grid grid-cols-3 gap-4">
                { invites.map(invite => <InviteCard name={invite.name} />) }
            </div>
        </div>
    )
}