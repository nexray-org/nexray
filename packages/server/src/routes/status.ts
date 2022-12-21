import { FastifyInstance } from "fastify";
import { Static, Type } from '@sinclair/typebox'
import type { GenericDB } from "../types";

const Reply = Type.Boolean();

const route = (db: GenericDB) => async (server: FastifyInstance) => {
    server.get<{ Reply: Static<typeof Reply> }>(
        '/status',
        {
            schema: {
                response: {
                    '2xx': Reply
                },
            },
        },
        (req, res) => {
            res.send(true);
        },
    );
}

export default route;