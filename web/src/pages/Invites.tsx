import { ChatCard } from "@/components/chat/ChatCard";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Check, Plus, X } from "lucide-react";

const invites = [
    {
        title: 'Diego Fernandes',
        avatar: 'https://github.com/diego3g.png',
    },
    {
        title: 'Mayk Brito',
        avatar: 'https://github.com/maykbrito.png',
    },
    {
        title: 'Daniel Castro',
        avatar: 'https://github.com/odanieldcs.png',
    },
    {
        title: 'Matheus Fraga',
        avatar: 'https://github.com/devfraga.png',
    },
    {
        title: 'Vinícius Barbosa',
        avatar: 'https://github.com/viniciusbarbosa1344.png',
    },
    {
        title: 'Arthur Mousinho',
        avatar: 'https://github.com/arthurmousinho.png',
    },
]

export function Invites() {
    return (
        <div className="m-10 w-full space-y-4">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">
                    Manage Your Invites
                </h1>
                <Dialog>
                    <DialogTrigger>
                        <Button className="flex items-center gap-2">
                            <Plus size={20} />
                            Send Invite
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle className="font-bold text-xl">
                            New Invite
                        </DialogTitle>
                        <DialogDescription>
                            Enter the username to send an invitation
                        </DialogDescription>
                        <form className="flex items-center flex-col gap-4">
                            <Input 
                                type="text" 
                                placeholder="Search name..."
                            />
                            <ScrollArea className="w-full h-[200px]">
                                {
                                    invites.map(invite => (
                                        <ChatCard 
                                            title={invite.title}
                                            avatar={invite.avatar}
                                            online={true}
                                        />  
                                    ))
                                }
                            </ScrollArea>
                        </form>
                    </DialogContent>
                </Dialog>
            </header>
            <div className="grid grid-cols-3 gap-4">
                {
                    invites.map(invite => (
                        <Card className="flex flex-col items-start">
                            <CardHeader className="flex flex-row items-center gap-2">
                                <img src={invite.avatar} className="w-[50px] rounded-full"/>
                                <span className="text-muted-foreground">
                                    <strong>{ invite.title }</strong>{' '}sent you a invite
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
                    ))
                }
            </div>
        </div>
    )
}