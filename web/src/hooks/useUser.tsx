import axios from "axios";
import { useToken } from "./useToken";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export interface User {
    email: string;
    name: string;
    password: string;
}

export function useUser() {

    const ENDPOINT = `${import.meta.env.VITE_API_BASE_URL}/user`

    const { saveToken, deleteToken, getToken } = useToken();
    const { toast } = useToast()

    const navigate = useNavigate();

    async function signUp(user: User) {
        try {
            await axios.post(`${ENDPOINT}/signup`, user);
            await signIn(user.email, user.password);
        } catch (error: any) {
            const errorMessage = error.response.data.message;
            toast({
                title: "😥 Error",
                variant: 'destructive',
                description: errorMessage,
            })
        }
    }

    async function signIn(email: string, password: string) {
        try {
            const response = await axios.post(`${ENDPOINT}/signin`, { email, password });
            const token = response.data.token as string;
            saveToken(token);
            navigate('/chats')
        } catch (error: any) {
            const errorMessage = error.response.data.message;
            toast({
                title: "😥 Error",
                variant: 'destructive',
                description: errorMessage,
            })
        }
    }

    async function signOut() {
        deleteToken();
        navigate('/wellcome')
    }

    async function searchByName(name: string) {
        try {
            const token = getToken();
            const response = await axios.get(`
                ${ENDPOINT}/${name}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data as User[]
        } catch (error) {
            console.log(error);
        }
    }
    
    return {
        signUp,
        signIn,
        signOut,
        searchByName
    }

}