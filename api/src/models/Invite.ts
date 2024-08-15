import { User } from "./User";

export interface Invite {
    id?: string;
    from?: User;
    to?: User;
    userFromId: string;
    userToId: string;
    createdAt?: Date;
}