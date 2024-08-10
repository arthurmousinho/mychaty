import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useEffect } from "react";
import { useChat } from "@/hooks/useChat";
import { useSocket } from "@/hooks/useSocket";

export function Layout() {

    const { getUserChats, onReceiveMessage } = useChat();
    const { 
        emitJoinChatEvent, 
        turnOnSendMessageListener, 
        turnOffSendMessageListener 
    } = useSocket();

    async function joinInChats() {
        const userChats = await getUserChats();
        if (!userChats) return;
        userChats.forEach(chat => emitJoinChatEvent(chat.id));
    }

    useEffect(() => {
        joinInChats();
        turnOnSendMessageListener(onReceiveMessage);

        return () => { turnOffSendMessageListener() }
    }, []);

    return (
        <main className="flex h-screen w-screen bg-slate-50">
            <Sidebar />
            <Outlet />
        </main>
    )
}
