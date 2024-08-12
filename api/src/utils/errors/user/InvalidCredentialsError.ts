import { GenericError } from "../GenericError";

export class InvalidCredentialsError extends GenericError {

    public name: string = 'Invalid Credentials Error';
    public message: string = `Invalid credentials`;
    public code: number = 401;

}