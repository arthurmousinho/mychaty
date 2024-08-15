import { GenericError } from "../GenericError";

export class InviteAlreadyExists extends GenericError {

    public name: string = 'Invite already exists';
    public message: string = 'Invite already exists';
    public code: number = 409;

}