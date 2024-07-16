import { Invite, User } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/UserService";
import { JwtService } from "../services/JwtService";

export class UserController {

    private userService: UserService;
    private jwtService: JwtService;

    constructor(){
        this.userService = new UserService();
        this.jwtService = new JwtService();

        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
        this.getByName = this.getByName.bind(this);
    }

    public async signIn(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { email, password } = request.body as User;
            const token = await this.userService.signInUser(email, password);
            reply.status(200).send({ token });
        } catch (error: any) {
            reply.status(401).send(error);
        }
    }

    public async signUp(request: FastifyRequest, reply: FastifyReply) {
        try {
            const body = request.body as User;
            const newUser = await this.userService.signUpUser(body);
            reply.status(200).send(newUser);
        } catch (error: any) {
            reply.status(400).send(error);
        }
    }

    public async getByName(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { name } = request.params as { name: string };
            const token = await this.jwtService.decode(request);
            const currentUserId = token.sub;
            
            const usersFound = await this.userService.searchUserForInvite(currentUserId, name);
            reply.status(200).send(usersFound);
        } catch (error) {
            reply.status(400).send(error);
        }
    }

}