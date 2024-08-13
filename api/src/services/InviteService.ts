import { Invite } from "../models/Invite";
import { InviteRepository } from "../repositories/InviteRepository";
import { InvalidInviteError } from "../utils/errors/invite/InvalidInviteError";
import { InviteAlreadyExists } from "../utils/errors/invite/InviteAlreadyExists";
import { InviteNotFoundError } from "../utils/errors/invite/InviteNotFoundError";
import { UserService } from "./UserService";

export class InviteService {

    private inviteRepository: InviteRepository;
    private userService: UserService;

    constructor() {
        this.inviteRepository = new InviteRepository();
        this.userService = new UserService();
    }

    public async getInviteById(id: string) {
        const invite = await this.inviteRepository.getById(id);
        if (!invite) throw new InviteNotFoundError();

        return invite;
    }
    
    public async getInviteBetweenUsers(user1Id: string, user2Id: string) {
        const invite = await this.inviteRepository.getInviteBetweenUsers(user1Id, user2Id);
        return invite;
    }

    public async createInvite(invite: Invite) {
        const [ userFrom, userTo ] = await Promise.all([
            this.userService.getUserById(invite.userFromId),
            this.userService.getUserById(invite.userToId)  
        ]);

        const inviteBetweenUsers = await this.getInviteBetweenUsers(userFrom.id, userTo.id);
        if (inviteBetweenUsers) throw new InviteAlreadyExists();

        const newInvite = await this.inviteRepository.create(invite);
        return newInvite;
    }

    public async listReceivedInvites(userId: string) {
        await this.userService.getUserById(userId);

        const receivedInvites = await this.inviteRepository.getAllReceivedByUserId(userId);
        return receivedInvites;
    }

    public async listSentInvites(userId: string) {
        await this.userService.getUserById(userId);

        const sentInvites = await this.inviteRepository.getAllSentByUserId(userId);
        return sentInvites;
    }

    public async acceptInvite(invite: Invite) {
        const inviteExists = await this.getInviteById(invite.id || '');

        const [userTo, userFrom] = await Promise.all([
            this.userService.getUserById(inviteExists.userToId),
            this.userService.getUserById(inviteExists.userFromId)  
        ]);

        const inviteBetweenUsers = await this.getInviteBetweenUsers(userFrom.id, userTo.id);
        if (!inviteBetweenUsers) throw new InviteAlreadyExists();

        if (inviteExists.status !== 'PENDING') throw new InvalidInviteError();

        await Promise.all([
            this.userService.startFriendship(userTo, userFrom),
            this.inviteRepository.updateInviteStatus(inviteExists, 'ACCEPTED')
        ])
    }

    public async denyInvite(invite: Invite) {
        const inviteExists = await this.getInviteById(invite.id || '');

        const [ userTo, userFrom ] = await Promise.all([
            this.userService.getUserById(inviteExists.userToId),
            this.userService.getUserById(inviteExists.userFromId)
        ]);

        const inviteBetweenUsers = await this.getInviteBetweenUsers(userTo.id, userFrom.id);
        if (!inviteBetweenUsers) throw new InviteAlreadyExists();

        if (inviteExists.status !== 'PENDING') throw new InvalidInviteError();

        await this.inviteRepository.updateInviteStatus(inviteExists, 'DENIED');
    }

}