import { Socket } from "socket.io";
import { Message } from "../models/Message";
import { MessageService } from "../services/MessageService";
import { UserStatus } from "../models/UserStatus";
import { UserService } from "../services/UserService";
import { ChatService } from "../services/ChatService";

export class SocketController {

    private messageService: MessageService;
    private userService: UserService;
    private chatService: ChatService;
   
    constructor() {
        this.messageService = new MessageService();
        this.userService = new UserService();
        this.chatService = new ChatService();
    }

    public async joinChat(socket: Socket, chatId: string) {
        socket.join(chatId);
    }

    public async sendMessage(socket: Socket, messageData: Message) {
        const newMessage = await this.messageService.createMessage({
            senderId: messageData.senderId,
            content: messageData.content,
            chatId: messageData.chatId
        });
        
        socket.to(messageData.chatId).emit('sendMessage', newMessage);
    }

    public async changeUserStatus(socket: Socket, status: UserStatus, userId: string ) {
        const userUpdated = await this.userService.updateUserStatus(status, userId);
        const userChats = await this.chatService.getUserChats(userUpdated.id);

        userChats.map(chat => {
            socket.to(chat.id).emit('changeUserStatus', userUpdated);
        });
    }

}