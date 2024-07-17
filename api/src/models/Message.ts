import { Chat, User } from "@prisma/client"

export interface Message {
    id: string;
    createdAt: string;
    sender: User;
    content: string;
    senderId: string;
    Chat: Chat;
    chatId: string;
}