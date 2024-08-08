import { MessageSquareCode } from "lucide-react";

export function Logo() {
    return (
        <h1 className="flex items-center text-xl font-bold gap-2 text-blue-500">
            <MessageSquareCode size={25} strokeWidth={2.5} />
            myChaty
        </h1>
    )
}