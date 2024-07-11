import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/UserController";

const userController = new UserController();

export async function UserRoutes(app: FastifyInstance) {

    app.post(
        '/user/signin',
        userController.signIn
    );

    app.post(
        '/user/signup',
        userController.signUp
    );

}