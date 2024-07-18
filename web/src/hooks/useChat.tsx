import axios from "axios";
import { useToken } from "./useToken";
import { User } from "./useUser";

interface Message {
    id: string;
    createdAt: string;
    sender: User;
    content: string;
    senderId: string;
    Chat: Chat;
    chatId: string;
}

export interface Chat {
    id: string;
    users: User[]
    messages: Message[]
}

export function useChat() {

    const ENDPOINT = `${import.meta.env.VITE_API_BASE_URL}/chat` 

    const { getToken } = useToken();

    async function getUserChats() {
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
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    return {
        getUserChats
    }

}