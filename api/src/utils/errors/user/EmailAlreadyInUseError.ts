import { GenericError } from "../GenericError";

export class EmailAlreadyInUseError extends GenericError {

    public name: string = 'Email Already In Use';
    public message: string = 'Email already in use';
    public code: number = 409;

}