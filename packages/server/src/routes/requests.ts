import { FastifyInstance } from "fastify";
import { Static, Type } from '@sinclair/typebox'
import type { GenericDB } from "../types";
import { ServerComponentRequest } from '@basis/types';

const Query = Type.Object({
    after: Type.Optional(Type.Number())
})

// https://github.com/dilan-dio4/reverse-proxy/blob/029e0b30759dd76150295dd175b13991fa0e0af1/src/app.ts#L867
// WebSockets interface for v2
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