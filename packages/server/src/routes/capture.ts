import { FastifyInstance } from "fastify";
import { Static, Type } from '@sinclair/typebox'
import type { GenericDB } from "../types";
import { ServerComponentRequest } from '@basis/types';

const Response = Type.Boolean();

const route = (db: GenericDB) => async (server: FastifyInstance) => {
    server.post<{ Body: ServerComponentRequest; Reply: Static<typeof Response>; }>(
        '/createPayment',
        {
            schema: {
                response: Response
            },
        },
        async (req, res) => {
            const { body } = req;
            db.insertAsync(body);
            res.send(true);
        },
    );
}

export default route;