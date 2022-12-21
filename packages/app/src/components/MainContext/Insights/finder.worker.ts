import { jsonfinder } from '@basis/json-finder';
import type { DiscoveredObject } from '../../../context/MainContentContext';

addEventListener('message', (event: MessageEvent<string>) => {
    const data: DiscoveredObject[] = [];
    for (const found of jsonfinder(event.data, true)) {
        if (Object.keys(found[2]).length > 0) {
            data.push(found);
        }
    }
    postMessage(data);
});
