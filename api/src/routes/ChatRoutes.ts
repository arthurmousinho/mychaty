import { FastifyInstance } from "fastify";
import { ChatController } from "../controllers/ChatController";
import { validateJwt } from "../utils/middlewares/jwtValidationMiddleware";

const chatController = new ChatController();

export async function ChatRoutes(app: FastifyInstance) {

    app.get(
        '/chat',
        { 
            preHandler: [ validateJwt() ] 
        },
        chatController.getChats
    );

    app.get(
        '/chat/:chatId',
        { 
            preHandler: [ validateJwt() ] 
        },
        chatController.getChatById
    );

}