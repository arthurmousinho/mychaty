import { FastifyInstance } from "fastify";
import { ChatController } from "../controllers/ChatController";

const chatController = new ChatController();

export async function ChatRoutes(app: FastifyInstance) {

    app.get(
        '/chat',
        chatController.getChats
    );

}