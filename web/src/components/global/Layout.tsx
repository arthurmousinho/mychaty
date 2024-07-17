import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function Layout() {
    return (
        <main className="flex h-screen w-screen bg-slate-50">
            <Sidebar />
            <Outlet />
        </main>
    )
}