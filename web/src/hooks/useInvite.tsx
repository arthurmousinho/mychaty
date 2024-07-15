import axios from "axios";
import { useToken } from "./useToken";
import { User } from "./useUser";

export interface Invite {
    id: string;
    userFromId: string;
    userToId: string;
    createdAt: string;
    from: User;
    to: User;
}


export function useInvite() {

    const ENDPOINT = `${import.meta.env.VITE_API_BASE_URL}/invite` 

    const { getToken } = useToken();

    async function getReceived() {
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

    return {
        getReceived
    }

}