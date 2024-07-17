import { User } from "@prisma/client";
import { Message } from "./Message";

export interface Chat {
    id: string;
    users: User[]
    messages: Message[]
}