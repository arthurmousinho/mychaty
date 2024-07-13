import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader } from "@/components/ui/card";
import { Check, Plus, X } from "lucide-react";

export function Invites() {
    return (
        <div className="m-10 w-full space-y-4">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">
                    Manage Your Invites
                </h1>
                <Button className="flex items-center gap-2">
                    <Plus size={20} />
                    Send Invite
                </Button>
            </header>
            <div className="space-y-4">
                <Card className="flex flex-row items-center justify-between">
                    <CardHeader className="flex flex-row items-center gap-2">
                        <img src="https://github.com/arthurmousinho.png" className="w-[50px] rounded-full"/>
                        <span className="text-muted-foreground">
                            <strong>
                                Arthur Mousinho
                            </strong>
                            {' '}
                            sent you a invite
                        </span>
                    </CardHeader>
                    <CardContent className="flex flex-row items-center gap-4 justify-center py-0">
                        <Button 
                            className="flex gap-2 items-center text-green-500 border-green-500 hover:bg-green-500 hover:text-slate-50" 
                            variant={'outline'}
                        >
                            <Check size={20} />
                            Accept
                        </Button>
                        <Button 
                            className="flex gap-2 items-center text-red-500 border-red-500 hover:bg-red-500 hover:text-slate-50" 
                            variant={'outline'}
                        >
                            <X size={20} />
                            Deny
                        </Button>
                    </CardContent>
                </Card>
                <Card className="flex flex-row items-center justify-between">
                    <CardHeader className="flex flex-row items-center gap-2">
                        <img src="https://github.com/arthurmousinho.png" className="w-[50px] rounded-full"/>
                        <span className="text-muted-foreground">
                            <strong>
                                Arthur Mousinho
                            </strong>
                            {' '}
                            sent you a invite
                        </span>
                    </CardHeader>
                    <CardContent className="flex flex-row items-center gap-4 justify-center py-0">
                        <Button 
                            className="flex gap-2 items-center text-green-500 border-green-500 hover:bg-green-500 hover:text-slate-50" 
                            variant={'outline'}
                        >
                            <Check size={20} />
                            Accept
                        </Button>
                        <Button 
                            className="flex gap-2 items-center text-red-500 border-red-500 hover:bg-red-500 hover:text-slate-50" 
                            variant={'outline'}
                        >
                            <X size={20} />
                            Deny
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}