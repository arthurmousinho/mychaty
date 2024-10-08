import { prisma } from "../../prisma";

export class ChatRepository {

    public async create() {
        const newChat = await prisma.chat.create({
            data: {}
        });
        return newChat;
    }

    public async getById(id: string) {
        const chat = await prisma.chat.findUnique({
            where: {
                id
            },
            include: {
                messages: true,
                users: true,
            }
        });
        return chat;
    }

    public async addUserToChat(chatId: string, userId: string) {
        const chatUpdated = await prisma.chat.update({
            where: {
                id: chatId
            },
            data: {
                users: {
                    connect: {
                        id: userId
                    }
                }
            }
        });
        return chatUpdated;
    }

    public async deleteById(id: string) {
        await prisma.chat.delete({
            where: {
                id
            }
        });
    }

    public async deleteAllByUserId(userId: string) {
        await prisma.chat.deleteMany({
            where: {
                users: {
                    some: {
                        id: userId
                    }
                }
            }
        });
    }

    public async getAllByUserId(userId: string) {
        const userChats = await prisma.chat.findMany({
            where: {
                users: {
                    some: {
                        id: userId
                    }
                }
            },
            include: {
                users: {
                    select: {
                        id: true,
                        name: true,
                        status: true,
                        avatar: true,
                    }
                }
            }
        });
        return userChats;
    }

    public async getChatByUsersIds(usersIds: string[]) {
        const chat = await prisma.chat.findFirst({
            where: {
                users: {
                    every: {
                        id: {
                            in: usersIds
                        }
                    }
                }
            }
        });
    
        return chat;
    }

}