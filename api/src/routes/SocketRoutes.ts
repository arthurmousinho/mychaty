import { SocketIoServer } from "../models/SocketIoServer";

export function SocketRoutes(socketIoServer: SocketIoServer) {

    socketIoServer.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('joinChat', (chatId) => {
            socket.join(chatId);
            console.log(`User joined chat: ${chatId}`);
        });

        socket.on('sendMessage', (messageData) => {
            const { chatId, message } = messageData;
            socketIoServer.to(chatId).emit('receive_message', message);
            console.log(`Message sent to chat ${chatId}: ${message}`);
        });

        socket.on('disconnect', () => {
            console.log('a user disconnected');
        });
    });

}