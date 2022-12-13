const N_POSSIBLE_ENDINGS = 10;

// Better to use PCRE library for JSON matching pattern
// https://stackoverflow.com/a/60556735



export default function jsonFinder(raw: string) {
    let totalSubsearchAttempts = 0;
    let totalSubsearchFailures = 0;
    const results: { json: Record<any, any>; start: number; end: number; }[] = [];

    for (let index = 0; index < raw.length; index++) {
        const letter = raw.charAt(index);
        if (letter === "{" || letter === "[") {
            const lookingFor = letter === "{" ? "}" : "]";

            const possibleEndIndexes: number[] = [];

            for (let index2 = index + 1; index2 < raw.length; index2++) {
                const letter2 = raw.charAt(index2);
                if (letter2 === lookingFor) {
                    possibleEndIndexes.push(index2);
                    if (possibleEndIndexes.length >= N_POSSIBLE_ENDINGS) {
                        break;
                    }
                }
            }

            // There's only one possible end index, what's the fastest way there?
            for (const possibleEnd of possibleEndIndexes) {
                totalSubsearchAttempts++;
                const rawPossibleJSONString = raw.slice(index, possibleEnd + 1);
                try {
                    const successfulParse = JSON.parse(rawPossibleJSONString);
                    results.push({
                        json: successfulParse,
                        start: index,
                        end: possibleEnd
                    });
                    // manually set index, because all this territory was already claimed
                    index = possibleEnd + 1
                    break;
                } catch (_) {
                    totalSubsearchFailures++;
                }
                // TODO: remove chars? whitespace? delimiters?
            }
        }
    }
    console.log("totalSubsearchAttempts: ", totalSubsearchAttempts);
    console.log("totalSubsearchFailures: ", totalSubsearchFailures);
    console.log("results: ", JSON.stringify(results, null, 2));
    return results;
}