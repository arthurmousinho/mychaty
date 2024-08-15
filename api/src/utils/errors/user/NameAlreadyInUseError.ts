import { GenericError } from "../GenericError";

export class NameAlreadyInUseError extends GenericError {

    public name: string = 'Name Already In Use';
    public message: string = 'Name already in use';
    public code: number = 409;

}