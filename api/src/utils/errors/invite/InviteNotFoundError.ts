import { GenericError } from "../GenericError";

export class InviteNotFoundError extends GenericError {

    public name: string = 'Invite Not Found Error';
    public message: string = 'Invite not found';
    public code: number = 404;

}