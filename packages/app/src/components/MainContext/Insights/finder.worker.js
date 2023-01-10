/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
var { jsonfinder } = require('@nexray/json-finder');

addEventListener('message', (event) => {
    const data = [];
    for (const found of jsonfinder(event.data, true)) {
        if (Object.keys(found[2]).length > 0) {
            data.push(found);
        }
    }
    postMessage(data);
});
