import { Chats } from "@/pages/Chats";
import { Auth } from "@/pages/Auth";
import { createBrowserRouter } from "react-router-dom";
import { Guard } from "./authGuard";
import { Invites } from "@/pages/Invites";
import { Layout } from "@/components/global/Layout";

export const ROUTER = createBrowserRouter([
    { 
        path: '/wellcome', 
        element: <Auth /> 
    },
    {
        path: '/',
        element: <Guard> <Layout /> </Guard>,
        children: [
            { path: '/chats', element: <Chats /> },
            { path: '/invites', element: <Invites /> }
        ]
    }
])