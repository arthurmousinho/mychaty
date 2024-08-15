import { Link } from "react-router-dom";
import { Card, CardHeader } from "../ui/card";
import { LogOut, UserRound, UserRoundPlus, UsersRound } from "lucide-react";
import { useToken } from "@/hooks/useToken";
import { useEffect, useState } from "react";

export function WellcomeOptions() {

    const { getTokenInfos } = useToken();
    const [ name, setName ] = useState('');

    useEffect(() => {
        setName(getTokenInfos().name);
    }, []);

    return (
        <div className="w-full h-full flex items-center flex-col justify-center">
            <div className="space-y-4">
                 <header>
                     <h1 className="text-2xl font-bold text-blue-500 text-muted-foreground">
                        👋 Hello, { name }
                     </h1>
                 </header>
                 <div className="grid grid-cols-2 gap-4 ">
                     <Link to={'/invites'}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-center gap-4 text-muted-foreground hover:bg-slate-50 w-[300px] font-semibold">
                                <UserRoundPlus size={25} />
                                <h2 className="text-lg">
                                   Invite Friends
                                </h2>
                            </CardHeader>
                        </Card>
                     </Link>
                     <Link to={'/friends'}>
                         <Card>
                             <CardHeader className="flex flex-row items-center justify-center gap-4 text-muted-foreground hover:bg-slate-50 w-[300px] font-semibold">
                                <UsersRound size={25} />
                                <h2 className="text-lg">
                                    Manage Friends
                                </h2>
                             </CardHeader>
                         </Card>
                     </Link>
                     <Link to={'/account'}>
                         <Card>
                             <CardHeader className="flex flex-row items-center justify-center gap-4 text-muted-foreground hover:bg-slate-50 w-[300px] font-semibold">
                                <UserRound size={25} />
                                <h2 className="text-lg">
                                    My Account
                                </h2>
                             </CardHeader>
                         </Card>
                     </Link>
                     <Link to={'/wellcome'}>
                         <Card>
                             <CardHeader className="flex flex-row items-center justify-center gap-4 text-muted-foreground hover:bg-slate-50 w-[300px] font-semibold">
                                <LogOut size={25} />
                                <h2 className="text-lg">
                                    Exit
                                </h2>
                             </CardHeader>
                         </Card>
                     </Link>
                 </div>
            </div>
        </div>
    )
}