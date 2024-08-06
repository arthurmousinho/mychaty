import { Invite } from "../models/Invite";
import { InviteRepository } from "../repositories/InviteRepository";
import { ChatService } from "./ChatService";
import { UserService } from "./UserService";

export class InviteService {

    private inviteRepository: InviteRepository;
    private userService: UserService;

    constructor() {
        this.inviteRepository = new InviteRepository();
        this.userService = new UserService();
    }
    
    public async createInvite(invite: Invite) {
        const userFromExists = await this.userService.getUserById(invite.userFromId);
        if (!userFromExists) throw new Error('User sender not found');

        const userToExists = await this.userService.getUserById(invite.userToId);
        if (!userToExists) throw new Error('User recipient not found');

        const newInvite = await this.inviteRepository.create(invite);
        return newInvite;
    }

    public async listReceivedInvites(userId: string) {
        const userExists = await this.userService.getUserById(userId);
        if (!userExists) throw new Error('User not found');

        const receivedInvites = await this.inviteRepository.getAllReceivedByUserId(userId);
        return receivedInvites;
    }

    public async listSentInvites(userId: string) {
        const userExists = await this.userService.getUserById(userId);
        if (!userExists) throw new Error('User not found');

        const sentInvites = await this.inviteRepository.getAllSentByUserId(userId);
        return sentInvites;
    }

    public async acceptInvite(invite: Invite) {
        const inviteExists = await this.inviteRepository.getById(invite.id || '');
        if (!inviteExists) throw new Error('Invite not found');

        const userTo = await this.userService.getUserById(inviteExists.userToId);
        if (!userTo) throw new Error(`User ${invite.to?.name} not found`);

        const userFrom = await this.userService.getUserById(inviteExists.userFromId);
        if (!userFrom) throw new Error(`User ${invite.from?.name} not found`);

        await this.userService.startFriendship(userTo, userFrom);
        await this.inviteRepository.updateInviteStatus(inviteExists, 'ACCEPTED');
    }

    public async denyInvite(invite: Invite) {
        const inviteExists = await this.inviteRepository.getById(invite.id || '');
        if (!inviteExists) throw new Error('Invite not found');

        const userTo = await this.userService.getUserById(inviteExists.userToId);
        if (!userTo) throw new Error(`User ${invite.to?.name} not found`);

        const userFrom = await this.userService.getUserById(inviteExists.userFromId);
        if (!userFrom) throw new Error(`User ${invite.from?.name} not found`);

        await this.inviteRepository.updateInviteStatus(inviteExists, 'DENIED');
    }

}