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
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Invite, useInvite } from "@/hooks/useInvite";

export function Invites() {
    const [inviteOption, setInviteOption] = useState<'RECEIVED' | 'SENT'>('RECEIVED');
    const [receivedInvites, setReceivedInvites] = useState<Invite[]>([]);
    const [sentInvites, setSentInvites] = useState<Invite[]>([]);

    const { getReceivedInvites, getSentInvites } = useInvite();

    async function loadReceivedInvites() {
        const invitesFound = await getReceivedInvites();
        setReceivedInvites(Array.isArray(invitesFound) ? invitesFound : []);
    }

    async function loadSentInvites() {
        const invitesFound = await getSentInvites();
        setSentInvites(Array.isArray(invitesFound) ? invitesFound : []);
    }

    function removeInvite(id: string) {
        if (inviteOption === 'RECEIVED') {
            const invitesUpdated = receivedInvites.filter(invite => invite.id !== id);
            setReceivedInvites(invitesUpdated);
        }
        if (inviteOption === 'SENT') {
            const invitesUpdated = sentInvites.filter(invite => invite.id !== id);
            setSentInvites(invitesUpdated);
        }
    }

    useEffect(() => {
        if (inviteOption === 'RECEIVED') loadReceivedInvites();
        if (inviteOption === 'SENT') loadSentInvites();
    }, [inviteOption]);

    return (
        <div className="w-full space-y-4">
            <header className="flex items-center justify-between border-b p-4">
                <h1 className="text-2xl font-semibold">Manage Your Invites</h1>
                <div className="flex items-center gap-4">
                    <Select
                        defaultValue="RECEIVED"
                        onValueChange={value => setInviteOption(value as 'RECEIVED' | 'SENT')}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter invites" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="RECEIVED" className="cursor-pointer">
                                Received Invites
                            </SelectItem>
                            <SelectItem value="SENT" className="cursor-pointer">
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
            <div className="grid grid-cols-3 gap-4 p-4">
                {inviteOption === 'RECEIVED' &&
                    receivedInvites.map(invite => (
                        <InviteCard
                            status="RECEIVED"
                            key={invite.id}
                            invite={invite}
                            onAcceptFn={removeInvite}
                            onDenyFn={removeInvite}
                        />
                    ))}
                {inviteOption === 'SENT' &&
                    sentInvites.map(invite => (
                        <InviteCard
                            status="SENT"
                            key={invite.id}
                            invite={invite}
                            onDeleteFn={removeInvite}
                        />
                    ))}
            </div>
        </div>
    );
}
