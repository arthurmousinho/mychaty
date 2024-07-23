import { Chats } from "@/pages/Chats";
import { Auth } from "@/pages/Auth";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Guard } from "./authGuard";
import { Invites } from "@/pages/Invites";
import { Layout } from "@/components/global/Layout";
import { Account } from "@/pages/Account";

export const ROUTER = createBrowserRouter([
    { 
        path: '/wellcome', 
        element: <Auth /> 
    },
    {
        path: '/',
        element: <Guard> <Layout /> </Guard>,
        children: [
            { path: '/', element: <Navigate to={'/wellcome'} /> },
            { path: '/chats', element: <Chats /> },
            { path: '/invites', element: <Invites /> },
            { path: '/account', element: <Account /> }
        ]
    }
])