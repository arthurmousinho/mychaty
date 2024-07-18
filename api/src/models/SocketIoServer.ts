import { Server } from "socket.io";
import { Message } from "./Message";

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  receive_message: (message: string) => void;
};

interface ClientToServerEvents {
  hello: () => void;
  joinChat: (chatId: string) => void;
  sendMessage: (messageData: Message) => void;
};

interface InterServerEvents {
  ping: () => void;
};

interface SocketData {
  name: string;
  age: number;
};

export interface SocketIoServer extends Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
> {};