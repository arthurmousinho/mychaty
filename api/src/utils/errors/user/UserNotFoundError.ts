import { GenericError } from "../GenericError";

export class UserNotFoundError extends GenericError {

    public name: string = 'User Not Found Error';
    public message: string = `User not found`;
    public code: number = 404;

}