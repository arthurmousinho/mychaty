import { Server } from "socket.io";
import { Message } from "../../models/Message";
import { UserStatus } from "../../models/UserStatus";

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
  changeUserStatus: (status: UserStatus, userId: string) => void;
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