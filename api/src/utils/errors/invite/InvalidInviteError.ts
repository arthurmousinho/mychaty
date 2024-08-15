import { GenericError } from "../GenericError";

export class InvalidInviteError extends GenericError {

    public name: string = 'Invalid Invite Error';
    public message: string = 'Invalid invite';
    public code: number = 400;

}