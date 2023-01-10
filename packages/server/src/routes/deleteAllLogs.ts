import { FastifyInstance } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import type { GenericDB } from '../types';

const Reply = Type.Boolean();

const route = (db: GenericDB) => async (server: FastifyInstance) => {
    server.post<{ Reply: Static<typeof Reply> }>(
        '/delete-all-logs',
        {
            schema: {
                response: {
                    '2xx': Reply,
                },
            },
        },
        async (req, res) => {
            const { body } = req;
            db.removeAsync({}, { multi: true });
            res.send(true);
        },
    );
};

export default route;
