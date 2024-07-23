import { SocketController } from "../controllers/SocketController";
import { Message } from "../models/Message";
import { SocketIoServer } from "../models/SocketIoServer";
import { UserStatus } from "../models/UserStatus";

const socketController = new SocketController();

export function SocketRoutes(socketIoServer: SocketIoServer) {
    socketIoServer.on('connection', (socket) => {
  
        socket.on(
            'joinChat', 
            (chatId: string) => socketController.joinChat(socket, chatId)
        );

        socket.on(
            'sendMessage', 
           (messageData: Message) => socketController.sendMessage(socket, messageData)
        );

        socket.on(
            'changeUserStatus', 
           (status: UserStatus, userId: string) => socketController.changeUserStatus(socket, status, userId)
        );

    });
}