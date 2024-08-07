import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";
import { HashService } from "./HashService";
import { JwtService } from "./JwtService";
import { ChatService } from "./ChatService";
import { UserStatus } from "../models/UserStatus";
import { InviteService } from "./InviteService";

export class UserService {

    private userRepository: UserRepository;
    private hashService: HashService;
    private jwtService: JwtService;
    private chatService: ChatService;

    constructor() {
        this.userRepository = new UserRepository();
        this.hashService = new HashService();
        this.jwtService = new JwtService();
        this.chatService = new ChatService();
    }

    public async signInUser(email: string, password: string) {
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

    public async signUpUser(user: User) {
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

    public async getUserByName(name: string) {
        const users = await this.userRepository.getByName(name);
        return users;
    }

    public async searchUserForInvite(currentUserId: string, searchedName: string) {
        const users = await this.userRepository.getUsersForInvite(currentUserId, searchedName);
        return users;
    }

    public async getUserById(id: string) {
        const user = await this.userRepository.getById(id);
        return user;
    }

    public async startFriendship(user: User, userFriend: User) {
        const [ userExists, userFriendExists ] = await Promise.all([
            this.userRepository.getById(user.id || ''),
            this.userRepository.getById(userFriend.id || '')
        ]);

        if (!userExists) throw new Error(`User ${user.name} not found`);
        if (!userFriendExists) throw new Error(`User ${userFriend.name} not found`);

        const newChat = await this.chatService.createChat();

        await Promise.all([
            this.userRepository.connectUserWithFriend(user, userFriend),
            this.userRepository.connectFriendWithUser(userFriend, user),
            this.chatService.addUserToChat(newChat.id, userExists.id),
            this.chatService.addUserToChat(newChat.id, userFriendExists.id)
        ]);
    }

    private async finishFriendship(user: User, userFriend: User) {
        const [ userExists, userFriendExists ] = await Promise.all([
            this.userRepository.getById(user.id || ''),
            this.userRepository.getById(userFriend.id || '')
        ]);

        if (!userExists) throw new Error(`User ${user.name} not found`);
        if (!userFriendExists) throw new Error(`User ${userFriend.name} not found`);

        const chatBetweenUsers = await this.chatService.getChatByUsersId([userExists.id, userFriendExists.id]);
        if (!chatBetweenUsers) throw new Error('Has no chat between these users');

        await Promise.all([
            this.userRepository.disconnectUserWithFriend(user, userFriend),
            this.userRepository.disconnectFriendWithUser(userFriend, user),
            this.chatService.deleteChat(chatBetweenUsers.id),
        ]);
    }

    public async getUserFriendsById(id: string) {
        const userExists = await this.userRepository.getById(id);
        if (!userExists) throw new Error(`User not found`);

        const userFriends = await this.userRepository.getFriendsByUserId(id);
        return userFriends;
    }

    public async updateUserStatus(status: UserStatus, id: string) {
        const userExists = await this.userRepository.getById(id);
        if (!userExists) throw new Error(`User not found`);

        const userUpdated = await this.userRepository.updateStatusById(status, id);
        return userUpdated;
    }

    public async updateUser(params: { id: string, name: string, email: string }) {
        const userExists = await this.userRepository.getById(params.id);
        if (!userExists) throw new Error(`User not found`);
        
        const userUpdated = await this.userRepository.updateUser(params);
        return userUpdated;
    }

    public async deleteUser(id: string) {
        const userExists = await this.userRepository.getById(id);
        if (!userExists) throw new Error(`User not found`);
        
        await this.chatService.deleteAllUserChats(id);
        await this.userRepository.deleteUser(id);
    }

    public async deleteUserFriend(userId: string, friendId: string) {
        const userExists = await this.userRepository.getById(userId, true);
        if (!userExists) throw new Error(`User not found`);

        const friendExists = await this.userRepository.getById(friendId);
        if (!friendExists) throw new Error(`User friend not found`);

        const areFriends = userExists.friends.some(friend => friend.id === friendId);
        if (!areFriends) throw new Error(`Users aren't friends`);

        await this.finishFriendship(userExists, friendExists);
    }

}