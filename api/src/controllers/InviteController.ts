import { FastifyReply, FastifyRequest } from "fastify";
import { Invite } from "../models/Invite";
import { InviteService } from "../services/InviteService";
import { JwtService } from "../utils/security/JwtService";

export class InviteController {

    private inviteService: InviteService;
    private jwtService: JwtService;

    constructor(){
        this.inviteService = new InviteService();
        this.jwtService = new JwtService();

        this.create = this.create.bind(this);
        this.listReceived = this.listReceived.bind(this);
        this.listSent = this.listSent.bind(this);
        this.accept = this.accept.bind(this);
        this.deny = this.deny.bind(this);
    }

    public async create(request: FastifyRequest, reply: FastifyReply) {
        try {
            const body = request.body as { userToId: string };
            const token = await this.jwtService.decode(request);
            
            const userFromId = token.sub;
            const userToId = body.userToId;

            const newInvite = await this.inviteService.createInvite({ 
                userFromId, 
                userToId }
            );

            reply.status(201).send(newInvite);
        } catch (error) {
            reply.status(400).send(error);
        }
    }

    public async listReceived(request: FastifyRequest, reply: FastifyReply) {
        try {
            const token = await this.jwtService.decode(request);
            const userId = token.sub;

            const receivedInvites = await this.inviteService.listReceivedInvites(userId);
            reply.status(200).send(receivedInvites);
        } catch (error) {
            reply.send(400).send(error);
        }
    }

    public async listSent(request: FastifyRequest, reply: FastifyReply) {
        try {
            const token = await this.jwtService.decode(request);
            const userId = token.sub;

            const sentInvites = await this.inviteService.listSentInvites(userId);
            reply.status(200).send(sentInvites);
        } catch (error) {
            reply.status(400).send(error);
        }
    }

    public async accept(request: FastifyRequest, reply: FastifyReply) {
        try {
            const token = await this.jwtService.decode(request);
            const userId = token.sub;
            const body = request.body as Invite;

            await this.inviteService.acceptInvite({ ...body, userFromId: userId });
            reply.status(200).send();
        } catch (error) {
            reply.status(400).send(error);
        }
    }

    public async deny(request: FastifyRequest, reply: FastifyReply) {
        try {
            const token = await this.jwtService.decode(request);
            const userId = token.sub;
            const body = request.body as Invite;

            await this.inviteService.denyInvite({ ...body, userFromId: userId });
            reply.status(200).send();
        } catch (error) {
            reply.status(400).send(error);
        }
    }

}