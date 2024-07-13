import { Invite } from "../models/Invite";
import { InviteRepository } from "../repositories/InviteRepository";
import { UserRepository } from "../repositories/UserRepository";

export class InviteService {

    private inviteRepository: InviteRepository;
    private userRepository: UserRepository;

    constructor() {
        this.inviteRepository = new InviteRepository();
        this.userRepository = new UserRepository();
    }
    
    public async createInvite(invite: Invite) {
        const userFrom = await this.userRepository.getById(invite.userFromId);
        if (!userFrom) throw new Error('User sender not found');

        const userTo = await this.userRepository.getById(invite.userToId);
        if (!userTo) throw new Error('User recipient not found');

        const newInvite = await this.inviteRepository.create(invite);
        return newInvite;
    }

    public async listReceivedInvites(userId: string) {
        const user = await this.userRepository.getById(userId);
        if (!user) throw new Error('User not found');

        const receivedInvites = await this.inviteRepository.getAllReceivedByUserId(userId);
        return receivedInvites;
    }

    public async listSentInvites(userId: string) {
        const user = await this.userRepository.getById(userId);
        if (!user) throw new Error('User not found');

        const sentInvites = await this.inviteRepository.getAllSentByUserId(userId);
        return sentInvites;
    }

}