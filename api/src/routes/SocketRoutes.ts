import { SocketIoServer } from "../models/SocketIoServer";

export function SocketRoutes(socketIoServer: SocketIoServer) {

    socketIoServer.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('joinChat', (chatId) => {
            socket.join(chatId);
            console.log(`Joined chat with: ${chatId}`);
        });

        socket.on('sendMessage', (messageData) => {
            const { chatId, content } = messageData;
            console.log(`Message received: ${content}`);
            socketIoServer.to(chatId).emit('receive_message', content);
        });

        socket.on('disconnect', () => {
            console.log('a user disconnected');
        });
    });

}