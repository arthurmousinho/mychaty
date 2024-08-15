import { GenericError } from "../GenericError";

export class ChatNotFoundError extends GenericError {

    public name: string = 'Chat Not Found Error';
    public message: string = 'Chat not found';
    public code: number = 404;

}