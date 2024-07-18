import fastify, { FastifyInstance } from "fastify";

import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { UserRoutes } from "./routes/UserRoutes";
import { InviteRoutes } from "./routes/InviteRoutes";

import { Server } from "socket.io";
import { SocketIoServer } from "./models/SocketIoServer";
import { SocketRoutes } from "./routes/SocketRoutes";
import { ChatRoutes } from "./routes/ChatRoutes";

export class MyChatyServer {

    public app: FastifyInstance;
    private socketIoSever: SocketIoServer;

    private origins = ['http://localhost:5173']

    private PORT = 3000;
    private HOST = '0.0.0.0';

    constructor() {
        this.app = fastify();
        this.socketIoSever = new Server(this.app.server, {
            cors: {
                origin: this.origins,
                methods: ['GET', 'POST'],
            }
        });

        this.app.register(cors, {
            origin: this.origins,
        });
        
        this.app.register(jwt, {
            secret: process.env.JWT_SECRET || '',
        });

        this.setRoutes();
    }

    private async setRoutes() {
        this.app.register(UserRoutes);
        this.app.register(InviteRoutes);
        this.app.register(ChatRoutes);
        SocketRoutes(this.socketIoSever);
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