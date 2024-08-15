import { MyChatyServer } from "./server";

export const server = new MyChatyServer();
export const app = server.app;

server.run();