import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

import defaultAvatar from '../../../assets/default-user-avatar.png'

interface InviteCardProps {
    name: string;
}

export function InviteCard(props: InviteCardProps) {
    return (
        <Card className="flex flex-col items-start">
             <CardHeader className="flex flex-row items-center gap-2">
                <img src={defaultAvatar} className="w-[50px] rounded-full"/>
                <span className="text-muted-foreground">
                    <strong>{ props.name }</strong>{' '}sent you a invite
                </span>
             </CardHeader>
             <CardContent className="flex flex-row items-center gap-4 justify-center w-full">
                <Button 
                    className="flex gap-2 items-center text-green-500 border-green-500 hover:bg-green-500 hover:text-slate-50 flex-1" 
                    variant={'outline'}
                >
                    <Check size={20} />
                    Accept
                </Button>
                <Button 
                    className="flex gap-2 items-center text-red-500 border-red-500 hover:bg-red-500 hover:text-slate-50 flex-1" 
                    variant={'outline'}
                >
                    <X size={20} />
                    Deny
                </Button>
             </CardContent>
        </Card>
    )
}