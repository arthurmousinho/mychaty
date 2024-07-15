import { InviteCard } from "@/components/invite/InviteCard";
import { NewInviteDialog } from "@/components/invite/NewInviteDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
                <NewInviteDialog>
                    <Button className="flex items-center gap-2">
                        <Plus size={20} />
                        Send Invite
                    </Button>
                </NewInviteDialog>
            </header>
            <div className="grid grid-cols-3 gap-4">
                { invites.map(invite => <InviteCard name={invite.name} />) }
            </div>
        </div>
    )
}