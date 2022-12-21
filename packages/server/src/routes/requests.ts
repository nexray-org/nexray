import { FastifyInstance } from "fastify";
import { Static, Type } from '@sinclair/typebox'
import type { GenericDB } from "../types";
import { ServerComponentRequest } from '@basis/types';

const Query = Type.Object({
    after: Type.Optional(Type.Number())
})

const route = (db: GenericDB) => async (server: FastifyInstance) => {
    server.get<{ Reply: ServerComponentRequest[]; Querystring: Static<typeof Query> }>(
        '/requests',
        {
            schema: {
                querystring: Query,
            },
        },
        async (req, res) => {
            const { after } = req.query;
            console.log("Captured request fetch")
            const docs = await db.findAsync(after ? { time: { $gt: after } } : {});
            res.send(docs);
        },
    );
}

export default route;