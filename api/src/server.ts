import fastify, { FastifyInstance } from "fastify";

import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { UserRoutes } from "./routes/UserRoutes";

export class Server {

    public app: FastifyInstance;

    private PORT = 3000;
    private HOST = '0.0.0.0';

    constructor() {
        this.app = fastify();
        this.app.get('/', () => ('Hello World'));

        this.app.register(cors, {
            origin: ['http://localhost:5173'],
        });
        
        this.app.register(jwt, {
            secret: process.env.JWT_SECRET || '',
        });

        this.setRoutes();
    }

    private async setRoutes() {
        this.app.register(UserRoutes);
    }

    public async run() {
        this.app.listen(
            {
                port: this.PORT,
                host: this.HOST,
            }
        ).then(() => {
            console.log(`Server running: http://localhost:${this.PORT}/`);
        })
    }

}