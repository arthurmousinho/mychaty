import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";
import { HashService } from "../utils/security/HashService";
import { JwtService } from "../utils/security/JwtService";
import { ChatService } from "./ChatService";
import { UserStatus } from "../models/UserStatus";
import { InviteRepository } from "../repositories/InviteRepository";
import { UserNotFoundError } from "../utils/errors/user/UserNotFoundError";
import { InvalidCredentialsError } from "../utils/errors/user/InvalidCredentialsError";
import { EmailAlreadyInUseError } from "../utils/errors/user/EmailAlreadyInUseError";

export class UserService {

    private userRepository: UserRepository;
    private hashService: HashService;
    private jwtService: JwtService;
    private chatService: ChatService;

    // TODO: Find a way to remove this, 
    // I tried to use inviteService, but I got a circular dependency issue
    private inviteRepository: InviteRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.hashService = new HashService();
        this.jwtService = new JwtService();
        this.chatService = new ChatService();
        this.inviteRepository = new InviteRepository();
    }

    public async signInUser(email: string, password: string) {
        const user = await this.getUserByEmail(email);

        const hashedPassword = user.password;
        const passwordMatched = this.hashService.comparePassword(password, hashedPassword);

        if (!passwordMatched) throw new InvalidCredentialsError();

        const token = this.jwtService.generateToken(user);
        return token;
    }

    public async signUpUser(user: User) {
        const emailAlreadyInUse = await this.userRepository.getByEmail(user.email);
        if (emailAlreadyInUse) throw new EmailAlreadyInUseError();

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

    public async getUserById(id?: string, includeFriends = false) {
        const user = await this.userRepository.getById(id || '', includeFriends);
        if (!user) throw new UserNotFoundError();

        return user;
    }

    private async getUserByEmail(email: string) {
        const user = await this.userRepository.getByEmail(email);
        if (!user) throw new UserNotFoundError();

        return user;
    }

    public async searchUserForInvite(currentUserId: string, searchedName: string) {
        const users = await this.userRepository.getUsersForInvite(currentUserId, searchedName);
        return users;
    }

    public async startFriendship(user: User, userFriend: User) {
        const [ 
            userExists, 
            userFriendExists 
        ] = await Promise.all([
            this.getUserById(user.id),
            this.getUserById(userFriend.id)
        ]);

        const newChat = await this.chatService.createChat();

        await Promise.all([
            this.userRepository.connectUserWithFriend(user, userFriend),
            this.userRepository.connectFriendWithUser(userFriend, user),
            this.chatService.addUserToChat(newChat.id, userExists.id),
            this.chatService.addUserToChat(newChat.id, userFriendExists.id)
        ]);
    }

    private async finishFriendship(user: User, userFriend: User) {
        const [ 
            userExists, 
            userFriendExists 
        ] = await Promise.all([
            this.getUserById(user.id),
            this.getUserById(userFriend.id)
        ]);

        const chatBetweenUsers = await this.chatService.getChatByUsersId([userExists.id, userFriendExists.id]);
        if (!chatBetweenUsers) throw new Error('Has no chat between these users');

        await Promise.all([
            this.userRepository.disconnectUserWithFriend(user, userFriend),
            this.userRepository.disconnectFriendWithUser(userFriend, user),
            this.chatService.deleteChat(chatBetweenUsers.id),
            this.inviteRepository.deleteInvitesBetweenUsers(userExists.id, userFriendExists.id)
        ]);
    }

    public async getUserFriendsById(id: string) {
        await this.getUserById(id);

        const userFriends = await this.userRepository.getFriendsByUserId(id);
        return userFriends;
    }

    public async updateUserStatus(status: UserStatus, id: string) {
        await this.getUserById(id);

        const userUpdated = await this.userRepository.updateStatusById(status, id);
        return userUpdated;
    }

    public async updateUser(params: { id: string, name: string, email: string, avatar: string }) {
        await this.getUserById(params.id);
        
        const userUpdated = await this.userRepository.updateUser(params);
        return userUpdated;
    }

    public async deleteUser(id: string) {
        await this.getUserById(id);
        
        await this.chatService.deleteAllUserChats(id);
        await this.userRepository.deleteUser(id);
    }

    public async deleteUserFriend(userId: string, friendId: string) {
        const user = await this.getUserById(userId, true);
        const userFriend = await this.getUserById(friendId);

        const areFriends = user.friends.some(friend => friend.id === friendId);
        if (!areFriends) throw new Error(`Users aren't friends`);

        await this.finishFriendship(user, userFriend);
    }

}