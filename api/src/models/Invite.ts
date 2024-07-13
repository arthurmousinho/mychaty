export interface Invite {
    id?: string;
    from?: string;
    to?: string;
    userFromId: string;
    userToId: string;
    createdAt?: Date;
}