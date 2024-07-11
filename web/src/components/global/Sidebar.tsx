import { Cog, MessageSquare, UserRoundPlus, Users } from "lucide-react";
import { Link } from "react-router-dom";

const sidebarLinks = [
    {
        icon: <MessageSquare />,
        to: '/chats'
    },
    {
        icon: <Users />,
        to: '/groups'
    },
    {
        icon: <UserRoundPlus />,
        to: 'Invites'
    },
    {
        icon: <Cog />,
        to: 'Settings'
    },
]

export function Sidebar() {
    return (
        <aside className="h-full bg-slate-100 flex flex-col justify-between items-center py-4 border">
            <nav className="flex flex-col gap-4 px-2">
                {
                    
                    sidebarLinks.map(link => (
                        <Link to={''} className="p-4 hover:bg-slate-200 rounded text-muted-foreground">
                            { link.icon }
                        </Link>
                    ))
                }
            </nav>
            <Link to={''}>
                <img 
                    className="w-[40px] rounded-full"
                    src="https://github.com/arthurmousinho.png" 
                    alt="Arthur Mousinho" 
                />
            </Link>
        </aside>
    )
}