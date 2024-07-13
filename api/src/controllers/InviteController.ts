import { FastifyReply, FastifyRequest } from "fastify";
import { Invite } from "../models/Invite";
import { InviteService } from "../services/InviteService";

export class InviteController {

    private inviteService: InviteService;

    constructor(){
        this.inviteService = new InviteService;
        this.create = this.create.bind(this);
    }

    public async create(request: FastifyRequest, reply: FastifyReply) {
        try {
            const body = request.body as Invite;
            const newInvite = await this.inviteService.createInvite(body);
            reply.status(201).send(newInvite);
        } catch (error) {
            reply.send(400).send(error);
        }
    }

}