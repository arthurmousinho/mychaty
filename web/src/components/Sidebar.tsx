import { Cog, MessageSquare, UserRoundPlus, Users } from "lucide-react";
import { Link } from "react-router-dom";

export function Sidebar() {
    return (
        <aside className="h-full bg-slate-100 flex flex-col justify-between items-center py-4 border">
            <nav className="flex flex-col gap-4 px-2">
                <Link to={''} className="p-4 hover:bg-slate-200 rounded text-muted-foreground">
                    <MessageSquare />
                </Link>
                <Link to={''} className="p-4 hover:bg-slate-200 rounded text-muted-foreground">
                    <Users />
                </Link>
                <Link to={''} className="p-4 hover:bg-slate-200 rounded text-muted-foreground">
                    <UserRoundPlus />
                </Link>
                <Link to={''} className="p-4 hover:bg-slate-200 rounded text-muted-foreground">
                    <Cog />
                </Link>
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