/**
 * To be removed, as soon as the grammar does not require NEWLINEs and WS
 * anymore
 */
export function cleanFileTree(input: string): string {
    let result = input.replace(/(\\r)?(\\n)|(\\r)/g, "");
    result = result.replace(/\r?\n|\r/g, "");
    result = result.replace(/\t/g, " ");
    result = result.replace(/[\s]+/g, " ")
    result = result.replace(/([\s]+)\)/, ")");
    result = result.replace(/(\\")/g, "\"");
    return result;
}
