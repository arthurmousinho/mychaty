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
import { useEffect, useState } from "react";
import { Invite, useInvite } from "@/hooks/useInvite";


export function Invites() {

    const [ invites, setInvites ] = useState<Invite[]>([]);

    const { getReceived } = useInvite();

    async function loadReceivedInvites() {
        const invitesReceived = await getReceived();
        if (!invitesReceived) return;
        setInvites(invitesReceived);
    }

    function removeInvite(id: string) {
        const invitesUpdated = invites.filter(invite => invite.id !== id);
        setInvites(invitesUpdated);
    }

    useEffect(() => {
        loadReceivedInvites()
    }, [])

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
                { invites.map(invite => (
                    <InviteCard 
                        key={invite.id} 
                        invite={invite} 
                        onAcceptFn={removeInvite}
                        onDenyFn={removeInvite}
                    />
                )) }
            </div>
        </div>
    )
}