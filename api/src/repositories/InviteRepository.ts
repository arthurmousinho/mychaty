import { prisma } from "../../prisma";
import { Invite } from "../models/Invite";

export class InviteRepository {

    public async create(invite: Invite) {
        const newInvite = await prisma.invite.create({
            data: {
                userFromId: invite.userFromId,
                userToId: invite.userToId,
            }
        });
        return newInvite;
    }
 
}