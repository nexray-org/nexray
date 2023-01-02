import { FastifyInstance } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import type { GenericDB } from '../types';
import { ServerComponentRequest } from '@nexray/types';

const Response = Type.Boolean();

const route = (db: GenericDB) => async (server: FastifyInstance) => {
    server.post<{ Body: { data: ServerComponentRequest }; Reply: Static<typeof Response> }>(
        '/capture-request',
        {
            schema: {
                response: {
                    '2xx': Response,
                },
            },
        },
        async (req, res) => {
            const { body } = req;
            console.log('Captured request: ', body.data);
            db.insertAsync(body.data);
            res.send(true);
        },
    );
};

export default route;
