import axios from "axios";
import { useToken } from "./useToken";
import { User } from "./useUser";
import { useToast } from "@/components/ui/use-toast";

export interface Invite {
    id: string;
    userFromId: string;
    userToId: string;
    status: 'PENDING' | 'DENIED' | 'ACCEPTED';
    createdAt: string;
    from: User;
    to: User;
}


export function useInvite() {

    const ENDPOINT = `${import.meta.env.VITE_API_BASE_URL}/invite` 

    const { getToken } = useToken();
    const { toast } = useToast();

    async function getReceivedInvites() {
        try {
            const token = getToken();
            const response = await axios.get(
                `${ENDPOINT}/list/received`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data as Invite[]
        } catch (error) {
            console.error(error);
        }
    }

    async function getSentInvites() {
        try {
            const token = getToken();
            const response = await axios.get(
                `${ENDPOINT}/list/sent`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data as Invite[]
        } catch (error) {
            console.error(error);
        }
    }

    async function acceptInvite(invite: Invite) {
        try {
            const token = getToken();
            await axios.put(
                `${ENDPOINT}/accept`, 
                invite,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                },
            );
            toast({
                title: "✅ Success",
                variant: 'default',
                description: `${invite.from.name}'s invite was accepted`,
            });
        } catch (error: any) {
            const errorMessage = error.response.data.message;
            toast({
                title: "😥 Error",
                variant: 'destructive',
                description: errorMessage,
            })
        }
    }

    async function denyInvite(invite: Invite) {
        try {
            const token = getToken();
            await axios.put(
                `${ENDPOINT}/deny`, 
                invite,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                },
            );
            toast({
                title: "✅ Success",
                variant: 'default',
                description: `${invite.from.name}'s invite was sent`,
            });
        } catch (error: any) {
            const errorMessage = error.response.data.message;
            toast({
                title: "😥 Error",
                variant: 'destructive',
                description: errorMessage,
            })
        }
    }

    async function createInvite(user: User) {
        try {
            const token = getToken();
            await axios.post(
                `${ENDPOINT}/create`, 
                { userToId: user.id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                },
            );
            toast({
                title: "✅ Success",
                variant: 'default',
                description: `An invite was sent to ${user.name}`,
            });
        } catch (error: any) {
            const errorMessage = error.response.data.message;
            toast({
                title: "😥 Error",
                variant: 'destructive',
                description: errorMessage,
            });
        }
    }

    return {
        getReceivedInvites,
        getSentInvites,
        acceptInvite,
        denyInvite,
        createInvite
    }

}