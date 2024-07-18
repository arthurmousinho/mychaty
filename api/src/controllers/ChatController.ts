import { FastifyReply, FastifyRequest } from "fastify";
import { JwtService } from "../services/JwtService";
import { ChatService } from "../services/ChatService";

export class ChatController {

    private jwtService: JwtService;
    private chatService: ChatService;

    constructor() {
        this.jwtService = new JwtService();
        this.chatService = new ChatService();
        
        this.getChats = this.getChats.bind(this);
    }
 
    public async getChats(request: FastifyRequest, reply: FastifyReply) {
        try {
            const token = await this.jwtService.decode(request);
            const userId = token.sub;

            const userChats = await this.chatService.getUserChats(userId);
            reply.status(200).send(userChats);
        } catch (error) {
            reply.send(400).send(error);
        }
    }

}