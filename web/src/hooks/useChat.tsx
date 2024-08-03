import axios from "axios";
import { useToken } from "./useToken";
import { User } from "./useUser";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export interface Message {
    id?: string;
    createdAt?: string;
    sender?: User;
    content: string;
    senderId: string;
    Chat?: Chat;
    chatId: string;
}

export interface Chat {
    id: string;
    users: User[]
    messages: Message[]
}


export function useChat() {
    
    const ENDPOINT = `${import.meta.env.VITE_API_BASE_URL}/chat`;
    
    const { getToken, getTokenInfos } = useToken();
    const { toast } = useToast();
    const navigate = useNavigate();

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
            return response.data as Chat[]
        } catch (error) {
            console.error(error);
        }
    }

    async function getChatInfos(id: string) {
        try {
            const token = getToken();
            const response = await axios.get(
                `${ENDPOINT}/${id}`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data as Chat
        } catch (error) {
            console.error(error);
        }
    }

    function onReceiveMessage(message: Message) {
        const currentUserWhoSentIt = getTokenInfos().sub === message.senderId;
        if (currentUserWhoSentIt) return;

        console.log('currentUserWhoSentIt: ' + currentUserWhoSentIt)
    
        const isTheCurrentChat = window.location.pathname === `/chats/${message.chatId}`;

        console.log('isTheCurrentChat: ' + isTheCurrentChat)
        console.log('route: ' + location.pathname)

        if (isTheCurrentChat) return;

        toast({
            title: `📩 ${message.sender?.name}`,
            variant: 'default',
            description: `${message.content}`,
            onClick: () => navigate(`chats/${message.chatId}`),
            className: 'cursor-pointer'
        });
    }

    return {
        getUserChats,
        getChatInfos,
        onReceiveMessage
    }

}