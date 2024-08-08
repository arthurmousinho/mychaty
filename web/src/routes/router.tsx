import { Chats } from "@/pages/Chats";
import { Auth } from "@/pages/Auth";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Guard } from "./authGuard";
import { Invites } from "@/pages/Invites";
import { Layout } from "@/components/global/Layout";
import { Account } from "@/pages/Account";
import { ChatArea } from "@/components/chat/ChatArea";
import { WellcomeOptions } from "@/components/global/WellcomeOptions";
import { Friends } from "@/pages/Friends";
import { Home } from "@/pages/Home";

export const ROUTER = createBrowserRouter([
    { 
        path: '', 
        element: <Home /> 
    },
    { 
        path: '/wellcome', 
        element: <Auth /> 
    },
    {
        path: '/',
        element: <Guard> <Layout /> </Guard>,
        children: [
            { path: '/', element: <Navigate to={'/wellcome'} /> },
            { 
                path: '/chats', 
                element: <Chats />,
                children: [
                    { path: '', element: <WellcomeOptions /> },
                    { path: ':id', element: <ChatArea /> },
                ]
            },
            { path: '/invites', element: <Invites /> },
            { path: '/account', element: <Account /> },
            { path: '/friends', element: <Friends /> },
        ]
    }
])