import axios from "axios";
import { useToken } from "./useToken";
import { User } from "./useUser";
import { useToast } from "@/components/ui/use-toast";

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

let currentChat: Chat | undefined = undefined;

export function useChat() {

    const ENDPOINT = `${import.meta.env.VITE_API_BASE_URL}/chat`;

    const { getToken, getTokenInfos } = useToken();
    const { toast } = useToast();

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

    function setCurrentChat(chat: Chat) {
        currentChat = chat;
    }

    function onReceiveMessage(message: Message) {
        console.log(currentChat)

        if (currentChat?.id === message.chatId) return
        if (getTokenInfos().sub === message.senderId) return;

        toast({
            title: `📩 ${message.sender?.name}`,
            variant: 'default',
            description: `${message.content}`
        });
    }

    return {
        getUserChats,
        getChatInfos,
        onReceiveMessage,
        setCurrentChat
    }

}