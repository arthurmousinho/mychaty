import { Server } from "./server";

export const server = new Server();
export const app = server.app;

server.run();