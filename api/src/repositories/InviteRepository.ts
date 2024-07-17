import { InviteStatus } from "@prisma/client";
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

    public async getById(id: string) {
        const invite = await prisma.invite.findUnique({
            where: {
                id
            },
            include: {
                to: true,
                from: true
            }
        });
        return invite;
    }

    public async getAllReceivedByUserId(userId: string) {
        const invites = await prisma.invite.findMany({
            where: {
                userToId: userId,
                status: 'PENDING'
            },
            include: {
                from: {
                    select: {
                        name: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
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
                        name: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return invites;
    }

    public async updateInviteStatus(invite: Invite, status: InviteStatus) {
        const updatedInvite = await prisma.invite.update({
            where: {
                id: invite.id
            },
            data: {
                status
            }
        });
        return updatedInvite;
    }
 
    public async deleteById(id: string) {
        await prisma.invite.delete({
            where: {
                id
            }
        })
    }

    public async getByUserFromId(userFromId: string) {
        const invite = await prisma.invite.findFirst({
            where: {
                userFromId
            }
        });
        return invite;
    }

    public async getByUserToId(userToId: string) {
        const invite = await prisma.invite.findFirst({
            where: {
                userToId
            }
        });
        return invite;
    }

}