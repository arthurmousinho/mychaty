import { Invite } from "@prisma/client";
import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";
import { HashService } from "./HashService";
import { JwtService } from "./JwtService";

export class UserService {

    private userRepository: UserRepository;
    private hashService: HashService;
    private jwtService: JwtService;

    constructor() {
        this.userRepository = new UserRepository();
        this.hashService = new HashService();
        this.jwtService = new JwtService();
    }

    public async signIn(email: string, password: string) {
        const user = await this.userRepository.getByEmail(email);

        if (!user) {
            throw new Error('User not found');
        }

        const hashedPassword = user.password;
        const passwordMatched = this.hashService.comparePassword(password, hashedPassword);

        if (!passwordMatched) {
            throw new Error('Invalid credentials');
        }

        const token = this.jwtService.generateToken(user);
        return token;
    }

    public async signUp(user: User) {
        const emailAlreadyInUser = await this.userRepository.getByEmail(user.email);
        if (emailAlreadyInUser) {
            throw new Error('Email already in use');
        }

        const hashPassword = this.hashService.hashPassword(user.password);
        const newUser = await this.userRepository.create({
            ...user,
            password: hashPassword
        });
        
        return newUser;
    }

}