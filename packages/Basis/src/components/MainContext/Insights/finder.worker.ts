import { jsonfinder } from '@basis/json-finder';
import type { DiscoveredObject } from '../../../context/MainContentContext';

addEventListener('message', (event: MessageEvent<string>) => {
    const data: DiscoveredObject[] = [];
    console.log("IN WORKER")
    for (const a of jsonfinder(event.data)) {
        data.push(a);
    }
    postMessage(data)
})