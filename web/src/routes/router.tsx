import { Chats } from "@/pages/Chats";
import { Login } from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";

export const ROUTER = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/chats',
        element: <Chats />
    }
])