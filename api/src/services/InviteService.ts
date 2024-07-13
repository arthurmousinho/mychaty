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
        if (!userTo) throw new Error('User recipient not found') 

        const newInvite = await this.inviteRepository.create(invite);
        return newInvite;
    }

}