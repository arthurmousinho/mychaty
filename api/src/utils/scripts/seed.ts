import { prisma } from "../../../prisma";
import { HashService } from "../security/HashService";

async function userSeed() {
    const usersAmount = await prisma.user.count();
    if (usersAmount > 0) {
        console.log('USER SEED: SKIPED')
        return;
    };

    const womanAvatar = 'https://ui.shadcn.com/avatars/01.png';
    const manAvatar = 'https://ui.shadcn.com/avatars/02.png';

    const hashService = new HashService();

    const mockUsers = [
        {
            email: 'jane.doe@example.com',
            name: 'Jane Doe',
            password: hashService.hashPassword('janeDoe123'),
            avatar: womanAvatar
        },
        {
            email: 'john.smith@example.com',
            name: 'John Smith',
            password: hashService.hashPassword('johnSmith123'), 
            avatar: manAvatar
        },
        {
            email: 'alice.jones@example.com',
            name: 'Alice Jones',
            password: hashService.hashPassword('aliceJones123'),
            avatar: womanAvatar
        },
        {
            email: 'bob.brown@example.com',
            name: 'Bob Brown',
            password: hashService.hashPassword('bobBrown123'), 
            avatar: manAvatar
        },
        {
            email: 'clara.white@example.com',
            name: 'Clara White',
            password: hashService.hashPassword('claraWhite123'),
            avatar: womanAvatar
        },
        {
            email: 'dave.wilson@example.com',
            name: 'Dave Wilson',
            password: hashService.hashPassword('daveWilson123'), 
            avatar: manAvatar
        },
        {
            email: 'emily.clark@example.com',
            name: 'Emily Clark',
            password: hashService.hashPassword('emilyClark123'),
            avatar: womanAvatar
        },
        {
            email: 'frank.green@example.com',
            name: 'Frank Green',
            password: hashService.hashPassword('frankGreen123'), 
            avatar: manAvatar
        }
    ];

    await prisma.user.createMany({
        data: mockUsers
    });

    console.log('USER SEED: CREATED')
}

export async function seed() {
    await userSeed();
}