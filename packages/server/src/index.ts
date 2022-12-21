import fastify from 'fastify';
import { homedir } from 'os';
import path from 'path';
import Datastore from '@seald-io/nedb';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { GenericDB } from './types';
import captureRoute from './routes/capture';
import requestsRoute from './routes/requests';
import statusRoute from './routes/status';

async function initLocalDb(provider: "local" | "remote"): Promise<GenericDB> {
    const db = new Datastore({ filename: path.join(homedir(), '.basis', 'dev-logs', 'nedb') })
    try {
        await db.loadDatabaseAsync()
    } catch (error) {
        // loading has failed
    }
    return db;
}

export default async function launch(provider: "local" | "remote") {
    const db = await initLocalDb("local");
    const server = fastify({ trustProxy: true }).withTypeProvider<TypeBoxTypeProvider>()
    const port = 4694;

    server.register(captureRoute(db));
    server.register(requestsRoute(db));
    server.register(statusRoute(db));

    await server.listen({ port });
    return server;
}

