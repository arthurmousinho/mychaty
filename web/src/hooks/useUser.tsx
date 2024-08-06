import axios from "axios";
import { useToken } from "./useToken";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";


export type UserStatus = 'ONLINE' | 'OFFLINE';
export interface User {
    id?: string;
    email: string;
    name: string;
    password: string;
    status: UserStatus; 
    friends: any[]
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

    async function getFriends() {
        try {
            const token = getToken();
            const response = await axios.get(`
                ${ENDPOINT}/friends`,
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
    
    async function getLoggedUser() {
        try {
            const token = getToken();
            const response = await axios.get(
                ENDPOINT,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data as User
        } catch (error) {
            console.log(error);
        }
    }

    async function updateUser(name: string, email: string) {
        try {
            const token = getToken();
            const response = await axios.put(
                ENDPOINT,
                { name, email },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            toast({
                title: "✅ Success",
                variant: 'default',
                description: 'Your informations was saved',
            });
            const userUpdated = response.data as User;
            return userUpdated;
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteUser() {
        try {
            const token = getToken();
            await axios.delete(
                ENDPOINT,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            navigate('/wellcome', { replace: true });
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteFriendById(friendId: string) {
        try {
            const token = getToken();
            await axios.delete(
                `${ENDPOINT}/friend/${friendId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        } catch (error: any) {
            const errorMessage = error.response.data.message;
            toast({
                title: "😥 Error",
                variant: 'destructive',
                description: errorMessage,
            })
        }
    }

    return {
        signUp,
        signIn,
        signOut,
        searchByName,
        getFriends,
        getLoggedUser,
        deleteUser,
        updateUser,
        deleteFriendById
    }

}