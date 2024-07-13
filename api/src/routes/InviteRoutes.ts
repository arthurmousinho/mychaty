import { FastifyInstance } from "fastify";
import { InviteController } from "../controllers/InviteController";

const inviteController = new InviteController();

export async function InviteRoutes(app: FastifyInstance) {

    app.post(
        '/invite/create',
        inviteController.create
    );

    app.get(
        '/invite/list/received',
        inviteController.listReceived
    );

    app.get(
        '/invite/list/sent',
        inviteController.listSent
    );

}