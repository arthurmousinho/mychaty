import { Chats } from "@/pages/Chats";
import { SignIn } from "@/pages/SignIn";
import { createBrowserRouter } from "react-router-dom";
import { Guard } from "./authGuard";
import { Invites } from "@/pages/Invites";
import { Layout } from "@/components/global/Layout";

export const ROUTER = createBrowserRouter([
    { 
        path: '/wellcome', 
        element: <SignIn /> 
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