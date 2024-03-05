import pretty from 'pretty';

export function prettyPrint(html: string): string {
    return pretty(html);
}