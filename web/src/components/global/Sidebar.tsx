import { useUser } from "@/hooks/useUser";
import { Cog, LogOut, MessageSquare, UserRoundPlus, Users } from "lucide-react";
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
        to: '/invites'
    },
    {
        icon: <Cog />,
        to: '/settings'
    },
]

export function Sidebar() {

    const { signOut } = useUser();

    return (
        <aside className="h-full bg-slate-100 flex flex-col justify-between items-center py-4 border">
            <nav className="flex flex-col gap-4 px-2">
                {
                    sidebarLinks.map(link => (
                        <Link 
                            to={link.to} 
                            key={link.to}
                            className="p-4 hover:bg-slate-200 rounded text-muted-foreground"
                        >
                            { link.icon }
                        </Link>
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