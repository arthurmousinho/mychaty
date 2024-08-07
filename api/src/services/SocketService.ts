import { Socket } from "socket.io";
import { MessageService } from "./MessageService";
import { Message } from "../models/Message";
import { UserService } from "./UserService";
import { ChatService } from "./ChatService";
import { UserStatus } from "../models/UserStatus";

export class SocketService {

    private messageService: MessageService;
    private userService: UserService;
    private chatService: ChatService;

    constructor(
        private socket: Socket
    ){
        this.messageService = new MessageService();
        this.userService = new UserService();
        this.chatService = new ChatService();
    }

    public async joinChat(chatId: string) {
        this.socket.join(chatId);
    }

    public async sendMessage(message: Message) {
        const newMessage = await this.messageService.createMessage({
            senderId: message.senderId,
            content: message.content,
            chatId: message.chatId
        });
        
        this.socket.to(message.chatId).emit('sendMessage', newMessage);
    }

    public async changeUserStatus(status: UserStatus, userId: string) {
        const userUpdated = await this.userService.updateUserStatus(status, userId);
        const userChats = await this.chatService.getUserChats(userUpdated.id);

        userChats.map(chat => {
            this.socket.to(chat.id).emit('changeUserStatus', userUpdated);
        });
    }

}