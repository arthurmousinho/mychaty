import { FastifyInstance } from "fastify";
import { InviteController } from "../controllers/InviteController";
import { validateJwt } from "../middlewares/jwtValidationMiddleware";

const inviteController = new InviteController();

export async function InviteRoutes(app: FastifyInstance) {

    app.post(
        '/invite/create',
        { 
            preHandler: [ validateJwt() ] 
        },
        inviteController.create
    );

    app.get(
        '/invite/list/received',
        { 
            preHandler: [ validateJwt() ] 
        },
        inviteController.listReceived
    );

    app.get(
        '/invite/list/sent',
        { 
            preHandler: [ validateJwt() ] 
        },
        inviteController.listSent
    );

    app.put(
        '/invite/accept',
        { 
            preHandler: [ validateJwt() ] 
        },
        inviteController.accept
    );

    app.put(
        '/invite/deny',
        { 
            preHandler: [ validateJwt() ] 
        },
        inviteController.deny
    );

}