import { SocketController } from "../controllers/SocketController";
import { Message } from "../models/Message";
import { SocketIoServer } from "../models/SocketIoServer";
import { UserStatus } from "../models/UserStatus";


export function SocketRoutes(socketIoServer: SocketIoServer) {
    socketIoServer.on('connection', (socket) => {

        const socketController = new SocketController(socket);

        socket.on(
            'joinChat', 
            (chatId: string) => socketController.joinChat(chatId)
        );

        socket.on(
            'sendMessage', 
           (messageData: Message) => socketController.sendMessage(messageData)
        );

        socket.on(
            'changeUserStatus', 
           (status: UserStatus, userId: string) => socketController.changeUserStatus(status, userId)
        );

    });
}