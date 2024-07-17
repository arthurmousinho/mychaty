import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { UserCard } from "../global/UserCard";
import { ChatMessage } from "./ChatMessage";
import { User } from "@/hooks/useUser";

interface ChatAreaProps {
    user: User;
}

export function ChatArea(props: ChatAreaProps) {
    return (
        <div className="h-full w-full flex flex-col justify-between rounded bg-slate-50">
            <header className="w-full border-b">
                <UserCard 
                    name={props.user.name}
                    online={true}
                />
            </header>
            <div className="p-4 flex-1 overflow-y-auto">
                <div className="flex flex-col space-y-4">
                    <ChatMessage 
                        content="What'up"
                        fromLoggedUser={false}
                    />
                    <ChatMessage 
                        content="Hello"
                        fromLoggedUser={true}
                    />
                </div>
            </div>
            <form className="flex items-center gap-2 p-4 border-t">
                <Input placeholder="Enter your message..." />
                <Button>
                    <Send size={20} />
                </Button>
            </form>
        </div>
    )
}