import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChatCard } from "./ChatCard";

export function Chat() {
    return (
        <div className="h-full w-full flex flex-col justify-between border rounded bg-slate-50">
            <header className="w-full border-b">
                <ChatCard 
                    avatar="https://github.com/diego3g.png"
                    title="Diego Fernandes"
                    online={true}
                />
            </header>
            <div className="p-4 flex-1 overflow-y-auto">
                <div className="flex flex-col space-y-4">
                    <div className="self-start bg-blue-400 p-3 rounded-xl rounded-bl-none max-w-xs w-fit">
                        <span className="text-slate-50">
                            Hi, What's Up?
                        </span>
                    </div>
                    <div className="self-end bg-blue-500 p-3 rounded-xl rounded-br-none max-w-xs w-fit">
                        <span className="text-slate-50">
                            Hello
                        </span>
                    </div>
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