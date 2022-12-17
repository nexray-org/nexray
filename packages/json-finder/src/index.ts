//https://github.com/alexmojaki/jsonfinder/blob/master/jsonfinder/__init__.py
 

export function* jsonfinder(
    s: string,
    json_only = false,
    predicate = (start: number, end: number, obj: any) => true,
): Generator<[number, number, any]> {
    let string_start = 0;
    let find_start = 0;
    let json_start;
    
    while(1) {
        const start1 = s.indexOf('{', find_start);
        const start2 = s.indexOf('[', find_start);
        if (start1 === -1) {
            if (start2 === -1) {
                if (!json_only) {
                    yield [string_start, s.length, null];
                }
                return;
            } else {
                json_start = start2;
            }
        } else {
            if (start2 === -1) {
                json_start = start1;
            } else {
                json_start = Math.min(start1, start2);
            }
        }

        let is_json = true;
        let obj: any = null
        let json_tuple: null | [number, number, any] = null;

        const rawDecodeRes = rawDecode(s, json_start);
        obj = rawDecodeRes[0];
        const end = rawDecodeRes[1];

        if (end === -1) {
            is_json = false;
        }

        // 98
        if (is_json) {
            json_tuple = [json_start, end, obj];
            if (!predicate(...json_tuple)) {
                is_json = false
            }
        }

        if (is_json) {
            if (!json_only) {
                yield [string_start, json_start, null]
            }
            yield json_tuple!;
            string_start = end;
            find_start = end;
        } else {
            find_start = json_start + 1;
        }
    }

}

// JS implementation of raw_decode
function rawDecode(s: string, start: number): [any, number] {
    const openingChar = s[start];
    const closingChar = openingChar === "{" ? "}" : "]";
    
    // Start at the end
    for (let i = s.length - 1; i >= 0; i--) {
        const currChar = s[i];
        if (currChar === closingChar) {
            try {
                const obj = JSON.parse(s.slice(start, i + 1));
                return [obj, i];
            } catch (error) {
                null;
            }
        }
    }

    return [undefined, -1];
}