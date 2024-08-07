import { Socket } from "socket.io";
import { Message } from "../models/Message";
import { UserStatus } from "../models/UserStatus";
import { SocketService } from "../services/SocketService";
export class SocketController {
    
    private socketService: SocketService;

    constructor(
        private socket: Socket
    ) {
        this.socketService = new SocketService(this.socket);
    }

    public async joinChat(chatId: string) {
        this.socketService.joinChat(chatId);
    }

    public async sendMessage(messageData: Message) {
        this.socketService.sendMessage(messageData);
    }

    public async changeUserStatus(status: UserStatus, userId: string ) {
        this.socketService.changeUserStatus(status, userId)
    }
    
}