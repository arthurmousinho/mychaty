import { Check, Trash, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

import defaultAvatar from '../../../assets/default-user-avatar.png'
import { Invite, useInvite } from "@/hooks/useInvite";
import { Badge } from "../ui/badge";

interface InviteCardProps {
    invite: Invite;
    status: 'RECEIVED' | 'SENT';
    onAcceptFn?: (id: string) => void;
    onDenyFn?: (id: string) => void;
    onDeleteFn?: (id: string) => void;
}

export function InviteCard(props: InviteCardProps) {

    const { acceptInvite, denyInvite, deleteInvite } = useInvite();

    function handleAcceptInvite() {
        if (props.onAcceptFn && props.status === 'RECEIVED') {
            acceptInvite(props.invite);
            props.onAcceptFn(props.invite.id);
        }
    }

    function handleDenyInvite() {
        if (props.onDenyFn && props.status === 'RECEIVED') {
            denyInvite(props.invite);
            props.onDenyFn(props.invite.id);
        }
    }
 
    function handleDeleteInvite() {
        if (props.onDeleteFn && props.status === 'SENT') {
            deleteInvite(props.invite);
            props.onDeleteFn(props.invite.id);
        }
    }

    if (props.status === 'RECEIVED') {
        return (
            <Card className="flex flex-col items-start">
                 <CardHeader className="flex flex-row items-center gap-2">
                    <img src={defaultAvatar} className="w-[50px] rounded-full"/>
                    <strong className="text-muted-foreground">
                        { props.invite.from.name }
                    </strong>
                </CardHeader>
                <CardContent className="flex flex-row items-center gap-4 justify-center w-full">
                    <Button 
                        className="flex gap-2 items-center text-green-500 border-green-500 hover:bg-green-500 hover:text-slate-50 flex-1" 
                        variant={'outline'}
                        onClick={handleAcceptInvite}
                    >
                        <Check size={20} />
                        Accept
                    </Button>
                    <Button 
                        className="flex gap-2 items-center text-red-500 border-red-500 hover:bg-red-500 hover:text-slate-50 flex-1" 
                        variant={'outline'}
                        onClick={handleDenyInvite}
                    >
                        <X size={20} />
                        Deny
                    </Button>
                </CardContent>
            </Card>
        )
    }
    
    if (props.status === 'SENT') {
        return (
            <Card className="flex flex-col items-start">
                 <CardHeader className="w-full flex flex-row items-center justify-between">
                    <header className="flex flex-row items-center gap-2">
                        <img src={defaultAvatar} className="w-[50px] rounded-full"/>
                        <strong className="text-muted-foreground">
                            { props.invite.to.name }
                        </strong>
                    </header>
                    <Badge>
                        { props.invite.status }
                    </Badge>
                </CardHeader>
                <CardContent className="flex flex-row items-center gap-4 justify-center w-full">
                    <Button 
                        className="flex gap-2 items-center text-red-500 border-red-500 hover:bg-red-500 hover:text-slate-50 flex-1" 
                        variant={'outline'}
                        onClick={handleDeleteInvite}
                    >
                        <Trash size={20} />
                        Cancel Invite
                    </Button>
                </CardContent>
            </Card>
        )
    }

}