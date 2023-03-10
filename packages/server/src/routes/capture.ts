import { FastifyInstance } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import type { GenericDB } from '../types';
import { ServerComponentRequest } from '@nexray/types';

const Reply = Type.Boolean();

const route = (db: GenericDB) => async (server: FastifyInstance) => {
    server.post<{ Body: { data: ServerComponentRequest }; Reply: Static<typeof Reply> }>(
        '/capture-request',
        {
            schema: {
                response: {
                    '2xx': Reply,
                },
            },
        },
        async (req, res) => {
            const { body } = req;
            db.insertAsync(body.data);
            res.send(true);
        },
    );
};

export default route;
