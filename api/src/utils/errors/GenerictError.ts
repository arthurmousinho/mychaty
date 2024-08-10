export abstract class GenerictError {

    constructor(
        private name: string,
        private message: string,
        private code: number,
    ){}

}