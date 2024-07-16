import { prisma } from "../../prisma";
import { User } from "../models/User";

export class UserRepository {

    public async getByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        return user;
    }

    public async create(user: User) {
        const newUser = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            }
        });
        return newUser;
    }

    public async getById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                invitesReceived: true,
                invitesSent: true,
            }
        });
        return user;
    }

    public async getByName(name: string) {
        const users = await prisma.user.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive'
                }
            }
        });
        return users;
    }

    public async getUsersForInvite(currentUserId: string, searchedUser: string) {
        const currentUserFriends = await prisma.user.findUnique({
            where: { id: currentUserId },
            select: { friends: { select: { id: true } } }
        });

        const friendIds = currentUserFriends?.friends.map(friend => friend.id) || [];
        const users = await prisma.user.findMany({
            where: {
                id: {
                    not: currentUserId,
                    notIn: friendIds
                },
                name: {
                    contains: searchedUser,
                    mode: 'insensitive'
                }
            }
        });
        
        return users;
    }

    public async connectUserWithFriend(user: User, friend: User) {
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                friends: {
                    connect: {
                        id: friend.id
                    }
                }
            }
        });
    }

    public async connectFriendWithUser(friend: User, user: User) {
        await prisma.user.update({
            where: {
                id: friend.id
            },
            data: {
                friends: {
                    connect: {
                        id: user.id
                    }
                }
            }
        });
    }

}