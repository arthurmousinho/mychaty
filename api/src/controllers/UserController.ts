import { Invite, User } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/UserService";

export class UserController {

    private userService: UserService

    constructor(){
        this.userService = new UserService;

        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    public async signIn(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { email, password } = request.body as User;
            const token = await this.userService.signIn(email, password);
            reply.status(200).send({ token });
        } catch (error: any) {
            reply.status(401).send(error);
        }
    }

    public async signUp(request: FastifyRequest, reply: FastifyReply) {
        try {
            const body = request.body as User;
            const newUser = await this.userService.signUp(body);
            reply.status(200).send(newUser);
        } catch (error: any) {
            reply.status(400).send(error);
        }
    }

    public async invite(request: FastifyRequest, reply: FastifyReply) {
        try {
            const body = request.body as Invite;

        } catch (error) {
            
        }
    }

}