import { Chats } from "@/pages/Chats";
import { SignIn } from "@/pages/SignIn";
import { createBrowserRouter } from "react-router-dom";
import { Guard } from "./authGuard";

export const ROUTER = createBrowserRouter([
    {
        path: '/',
        element: <SignIn />
    },
    {
        path: '/chats',
        element: <Guard> <Chats /> </Guard>
    }
])