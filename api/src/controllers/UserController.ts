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
        this.getFriends = this.getFriends.bind(this);
        this.getUser = this.getUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
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

    public async getFriends(request: FastifyRequest, reply: FastifyReply) {
        try {
            const token = await this.jwtService.decode(request);
            const userId = token.sub;
            const userFriends = await this.userService.getUserFriendsById(userId);
            reply.status(200).send(userFriends);
        } catch (error) {
            reply.status(400).send(error);
        }
    }

    public async getUser(request: FastifyRequest, reply: FastifyReply) {
        try {
            const token = await this.jwtService.decode(request);
            const userId = token.sub;
            const user = await this.userService.getUserById(userId);
            reply.status(200).send(user);
        } catch (error) {
            reply.status(400).send(error);
        }
    }

    public async updateUser(request: FastifyRequest, reply: FastifyReply) {
        try {
            const token = await this.jwtService.decode(request);
            const id = token.sub;
            const { name, email } = request.body as { email: string, name: string }

            const userUpdated = await this.userService.updateUser({ id, name, email });
            reply.status(204).send(userUpdated);
        } catch (error) {
            reply.status(400).send(error);
        }
    }

    public async deleteUser(request: FastifyRequest, reply: FastifyReply) {
        try {
            const token = await this.jwtService.decode(request);
            const userId = token.sub;
            
            await this.userService.deleteUser(userId);
            reply.status(200).send();
        } catch (error) {
            reply.status(400).send(error);
        }
    }

}