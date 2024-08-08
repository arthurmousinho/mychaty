import { FastifyReply, FastifyRequest } from "fastify";
import { JwtService } from "../services/JwtService";

const jwtService = new JwtService();

export function validateJwt() {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await jwtService.verify(request);
        } catch (error: any) {
            const errorMessage = "Invalid token";
            reply.status(403).send({ statusCode: 403, message: errorMessage });
        }
    }
}