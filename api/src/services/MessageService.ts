import { Message } from "../models/Message";
import { MessageRepository } from "../repositories/MessageRepository";

export class MessageService {

    private messageRepository: MessageRepository;

    constructor() {
        this.messageRepository = new MessageRepository();
    }

    public async createMessage(message: Message) {
        const newMessage = await this.messageRepository.create(message);
        return newMessage;
    }

    public async getChatMessages(chatId: string) {
        const chatMessages = await this.messageRepository.getByChatId(chatId);
        return chatMessages;
    }

}