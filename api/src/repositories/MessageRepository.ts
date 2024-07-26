import { prisma } from "../../prisma";
import { Message } from "../models/Message";


export class MessageRepository {

    public async create(message: Message) {
        const newMessage = await prisma.message.create({
            data: {
                senderId: message.senderId,
                chatId: message.chatId,
                content: message.content
            },
            include: {
                sender: true
            }
        });
        return newMessage;
    }

    public async getByChatId(chatId: string) {
        const chatMessages = await prisma.message.findMany({
            where: {
                chatId
            }
        });
        return chatMessages;
    }

}