import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/UserController";
import { validateJwt } from "../utils/middlewares/jwtValidationMiddleware";

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

    app.get(
        '/user/:name',
        { 
            preHandler: [ validateJwt() ] 
        },
        userController.getByName
    );

    app.get(
        '/user/friends',
        { 
            preHandler: [ validateJwt() ] 
        },
        userController.getFriends
    );

    app.get(
        '/user',
        { 
            preHandler: [ validateJwt() ] 
        },
        userController.getUser
    );

    app.put(
        '/user',
        { 
            preHandler: [ validateJwt() ] 
        },
        userController.updateUser
    );

    app.delete(
        '/user',
        { 
            preHandler: [ validateJwt() ] 
        },
        userController.deleteUser
    );

    app.delete(
        '/user/friend/:id',
        { 
            preHandler: [ validateJwt() ] 
        },
        userController.deleteUserFriend
    );

}