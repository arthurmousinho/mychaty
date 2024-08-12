import { FastifyRequest } from "fastify";
import { User } from "../../models/User";
import { app } from "../../app";

export interface Token {
  name: string;
  email: string;
  sub: string;
  exp: number;
  avatar: string;
}

export class JwtService {

  async generateToken(user: User) {  
    const token = app.jwt.sign(
      {
        name: user.name,
        email: user.email,
        avatar: user.avatar
      },
      {
        sub: user.id,
        expiresIn: '10 days',
      },
    );
    return token;
  }

  public verify(request: FastifyRequest) {
    return request.jwtVerify();
  }

  public async decode(request: FastifyRequest) {
    const decoded = await request.jwtDecode();
    return Object(decoded) as Token
  }
  
}