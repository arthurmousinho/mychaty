import { Socket } from "socket.io";
import { Message } from "../models/Message";

export class SocketController {

    public joinChat(socket: Socket, chatId: string) {
        socket.join(chatId);
        console.log(`Chat joined: ${chatId}`);
    }

    public sendMessage(socket: Socket, messageData: Message) {
        const { chatId, content } = messageData;
        console.log(`Message received: ${content}`);
        socket.to(chatId).emit('receive_message', content);
    }

}