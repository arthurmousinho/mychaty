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
            }
        });
        return user;
    }

}