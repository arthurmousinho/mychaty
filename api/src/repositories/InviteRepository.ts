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

    public async getAllReceivedByUserId(userId: string) {
        const invites = await prisma.invite.findMany({
            where: {
                userToId: userId
            },
            include: {
                from: {
                    select: {
                        email: true,
                        name: true,
                    }
                }
            }
        });
        return invites;
    }

    public async getAllSentByUserId(userId: string) {
        const invites = await prisma.invite.findMany({
            where: {
                userFromId: userId
            },
            include: {
                to: {
                    select: {
                        email: true,
                        name: true,
                    }
                }
            }
        });
        return invites;
    }
 
}