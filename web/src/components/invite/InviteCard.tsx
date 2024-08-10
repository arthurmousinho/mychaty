import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

import defaultAvatar from '../../../assets/default-user-avatar.png'
import { Invite, useInvite } from "@/hooks/useInvite";
import { Badge } from "../ui/badge";
import { useState } from "react";

import ConfettiExplosion from 'react-confetti-explosion';

interface InviteCardProps {
    invite: Invite;
    status: 'RECEIVED' | 'SENT';
    onAcceptFn?: (id: string) => void;
    onDenyFn?: (id: string) => void;
    onDeleteFn?: (id: string) => void;
}

export function InviteCard(props: InviteCardProps) {

    const { acceptInvite, denyInvite } = useInvite();

    const [ isExploding, setIsExploding ] = useState(false);

    function handleAcceptInvite() {
        setIsExploding(false)
        if (props.onAcceptFn && props.status === 'RECEIVED') {
            setIsExploding(true)
            acceptInvite(props.invite);
            setTimeout(() => {
                if (!props.onAcceptFn) return;
                props.onAcceptFn(props.invite.id);
            }, 1000)
        }
    }

    function handleDenyInvite() {
        if (props.onDenyFn && props.status === 'RECEIVED') {
            denyInvite(props.invite);
            props.onDenyFn(props.invite.id);
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
                {
                    props.status === 'RECEIVED' && (
                        <CardContent className="flex flex-row items-center gap-4 justify-center w-full">
                            <div className="flex-1 relative flex justify-center items-center">
                                <Button 
                                    className="flex gap-2 items-center text-green-500 border-green-500 hover:bg-green-500 hover:text-slate-50 w-full border z-10" 
                                    variant={'outline'}
                                    onClick={handleAcceptInvite}
                                >
                                    <Check size={20} />
                                    Accept
                                </Button>
                                {
                                    isExploding && 
                                    <div className="absolute">
                                        <ConfettiExplosion 
                                            force={0.4}
                                            duration={2200}
                                            particleCount={50}
                                            width={400}
                                            className="z-0"
                                        />
                                    </div>
                                }
                            </div>
                            <Button 
                                className="flex gap-2 items-center text-red-500 border-red-500 hover:bg-red-500 hover:text-slate-50 flex-1" 
                                variant={'outline'}
                                onClick={handleDenyInvite}
                            >
                                <X size={20} />
                                Deny
                            </Button>
                        </CardContent>
                    )
                }
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
            </Card>
        )
    }

}