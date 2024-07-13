import { FastifyInstance } from "fastify";
import { InviteController } from "../controllers/InviteController";

const inviteController = new InviteController();

export async function InviteRoutes(app: FastifyInstance) {

    app.post(
        '/invite/create',
        inviteController.create
    );

}