import { useUser } from "@/hooks/useUser";
import { LogOut, MessageSquare, UserRound, UserRoundPlus, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const sidebarLinks = [
    {
        icon: <MessageSquare />,
        to: '/chats',
        title: 'Chats'
    },
    {
        icon: <UsersRound />,
        to: '/friends',
        title: 'Friends'
    },
    {
        icon: <UserRoundPlus />,
        to: '/invites',
        title: 'Invites'
    },
    {
        icon: <UserRound />,
        to: '/account',
        title: 'Account'
    },
]

export function Sidebar() {

    const { signOut } = useUser();

    return (
        <Card className="h-full flex flex-col justify-between items-center py-4 border rounded-none">
            <nav className="flex flex-col gap-6 px-2">
                {
                    sidebarLinks.map(link => (
                        <TooltipProvider key={link.to}>
                            <Link to={link.to}>
                                <Tooltip>
                                    <TooltipTrigger> 
                                        <Button 
                                            className="p-4 py-6 hover:bg-primary hover:text-white    text-muted-foreground" 
                                            variant={'ghost'}
                                        >
                                            { link.icon }
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <span>{ link.title }</span>
                                    </TooltipContent>
                                </Tooltip>
                            </Link>
                        </TooltipProvider>
                    ))
                }
            </nav>
            <Link to={'/'} onClick={signOut}>
                <LogOut className="text-red-400" />
            </Link>
        </Card>
    )
}
