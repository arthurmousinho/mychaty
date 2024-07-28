import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useChat } from "@/hooks/useChat";

const socket = io(import.meta.env.VITE_API_BASE_URL, {
    transports: ['websocket']
});

export function Layout() {

    const { getUserChats, onReceiveMessage } = useChat();

    async function joinInChats() {
        const userChats = await getUserChats();
        if (!userChats) return;
        userChats.forEach(chat => socket.emit('joinChat', chat.id));
    }

    useEffect(() => {
        joinInChats();
        socket.on('sendMessage', onReceiveMessage);

        return () => {
            socket.off('sendMessage', onReceiveMessage)
        }
    }, []);

    return (
        <main className="flex h-screen w-screen bg-slate-50">
            <Sidebar />
            <Outlet />
        </main>
    )
}
