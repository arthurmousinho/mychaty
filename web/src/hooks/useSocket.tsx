import { io } from "socket.io-client";
import { Message } from "./useChat";
import { User, UserStatus } from "./useUser";

const socket = io(import.meta.env.VITE_API_BASE_URL, {
    transports: ['websocket']
});

export function useSocket() {

    function emitJoinChatEvent(chatId: string) {
        socket.emit('joinChat', chatId);
    }

    function emitChangeUserStatusEvent(newStatus: UserStatus, userId: string) {
        socket.emit('changeUserStatus', newStatus, userId);
    }

    function turnOnChangeUserStatusListener(callback: (user: User) => void) {
        socket.on('changeUserStatus', callback);
    }

    function turnOffChangeUserStatusListener() {
        socket.off('changeUserStatus');
    }

    function emitSendMessageEvent(message: Message) {
        socket.emit('sendMessage', message);
    }

    function turnOnSendMessageListener(callback: (message: Message) => void) {
        socket.on('sendMessage', callback);
    }

    function turnOffSendMessageListener() {
        socket.off('sendMessage');
    }

    return {
        emitJoinChatEvent,
        
        turnOnSendMessageListener,
        turnOffSendMessageListener,

        emitChangeUserStatusEvent,
        turnOnChangeUserStatusListener,
        turnOffChangeUserStatusListener,

        emitSendMessageEvent
    }

}