import fastify, { FastifyInstance } from "fastify";

export class Server {

    private server: FastifyInstance;
    private PORT = 3333;

    constructor() {
        this.server = fastify();

        this.server.get('/', () => ('Hello World'))
    }

    public async run() {
        try {
            await this.server.listen(
                {
                    port: this.PORT
                }
            );
            console.log(`Server running: http://localhost:${this.PORT}/`);
        } catch (error) {
            console.error('Error on server running');
        }
    }

}