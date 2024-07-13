import { useToken } from "@/hooks/useToken";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface GuardProps {
    children: ReactNode;
}

export function Guard({ children }: GuardProps) {
    
    const { hasToken } = useToken();
   
    return (
        <>
            {
                hasToken() 
                ? children 
                : <Navigate to={'/'} />
            }
        </>
    )
}