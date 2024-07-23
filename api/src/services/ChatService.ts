import { ChatRepository } from "../repositories/ChatRepository";

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

    public async addUserToChat(chatId: string, userId: string) {
        const chatExists = await this.chatRepostitory.getById(chatId);
        if (!chatExists) throw new Error('Chat not found');

        await this.chatRepostitory.addUserToChat(chatId, userId);
    }

    public async deleteChat(chatId: string) {
        const chatExists = await this.chatRepostitory.getById(chatId);
        if (!chatExists) throw new Error('Chat not found');

        await this.chatRepostitory.deleteById(chatId);
    } 

    public async getChatById(chatId: string) {
        const chatExists = await this.chatRepostitory.getById(chatId);
        if (!chatExists) throw new Error('Chat not found');

        const chat = await this.chatRepostitory.getById(chatId);
        return chat;
    }

}