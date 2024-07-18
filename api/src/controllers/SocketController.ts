import { Socket } from "socket.io";
import { Message } from "../models/Message";
import { MessageService } from "../services/MessageService";

export class SocketController {

    private messageService: MessageService;

    constructor() {
        this.messageService = new MessageService();
    }

    public async joinChat(socket: Socket, chatId: string) {
        socket.join(chatId);
        console.log(`Chat joined: ${chatId}`);
    }

    public async sendMessage(socket: Socket, messageData: Message) {
        console.log(`Message received: ${messageData.content}`);

        const newMessage = await this.messageService.createMessage({
            senderId: messageData.senderId,
            content: messageData.content,
            chatId: messageData.chatId
        });

        socket.to(messageData.chatId).emit('sendMessage', newMessage);
    }

}