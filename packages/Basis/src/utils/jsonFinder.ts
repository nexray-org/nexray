import fetch from 'isomorphic-unfetch';

export default async function clipJsonFromAPI(text: string, customUrl: string | undefined) {
    try {
        const res = await fetch(customUrl || 'https://us-central1-shtl-371501.cloudfunctions.net/pyjf', {
            body: JSON.stringify({ text }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });

        const resText = await res.text();
        // [start, end, obj][]
        const objsDiscovered: [number, number, Record<any, any> | any[]][] = JSON.parse(resText).found;
        return objsDiscovered;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}
