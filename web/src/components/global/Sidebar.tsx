import { useUser } from "@/hooks/useUser";
import { LogOut, MessageSquare, UserRound, UserRoundPlus, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

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
        <aside className="h-full bg-slate-100 flex flex-col justify-between items-center py-4 border">
            <nav className="flex flex-col gap-4 px-2">
                {
                    sidebarLinks.map(link => (
                        <TooltipProvider key={link.to}>
                            <Link to={link.to}>
                                <Tooltip>
                                    <TooltipTrigger className="p-4 hover:bg-slate-200 rounded text-muted-foreground"> 
                                        { link.icon }
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
            <Link to={'/'}>
                <LogOut 
                    className="text-red-400" 
                    onClick={signOut} 
                />
            </Link>
        </aside>
    )
}
