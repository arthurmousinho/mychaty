import { Invite } from "@prisma/client";

export interface User {
    id?: string;
    email: string;
    name: string;
    avatar: string;
    password: string;
    createdAt?: Date;

    invitesSent?: Invite[]
    invitesReceived?: Invite[]
}