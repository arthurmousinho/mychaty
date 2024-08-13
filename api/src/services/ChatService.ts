import { ChatRepository } from "../repositories/ChatRepository";
import { ChatNotFoundError } from "../utils/errors/chat/ChatNotFoundError";

export class ChatService {

    private chatRepostitory: ChatRepository;
    
    constructor() {
        this.chatRepostitory = new ChatRepository();
    }

    public async getUserChats(userId: string, includeUser = false) {
        const userChats = await this.chatRepostitory.getAllByUserId(userId);

        const filteredUserChats = userChats.map(chat => ({
            ...chat,
            users: chat.users.filter(user => user.id !== userId)
        }));

        return includeUser ? userChats : filteredUserChats;
    }

    public async createChat() {
        const newChat = await this.chatRepostitory.create();
        return newChat;
    }

    public async getChatById(chatId: string) {
        const chat = await this.chatRepostitory.getById(chatId);
        if (!chat) throw new ChatNotFoundError();

        return chat;
    }

    public async addUserToChat(chatId: string, userId: string) {
        await this.getChatById(chatId);
        await this.chatRepostitory.addUserToChat(chatId, userId);
    }

    public async deleteChat(chatId: string) {
        await this.getChatById(chatId);
        await this.chatRepostitory.deleteById(chatId);
    }

    public async deleteAllUserChats(userId: string) {
        await this.chatRepostitory.deleteAllByUserId(userId);
    }

    public async getChatByUsersId(usersIds: string[]) {
        const usersChat = await this.chatRepostitory.getChatByUsersIds(usersIds);
        return usersChat;
    }

}