import { RichTextToken } from "./rich-text-token.js";

/**
 * A `PlainTextToken` represents a piece of text that is not formatted in any way.
 */
export class PlainTextToken implements RichTextToken {
    constructor(private text: string) {
    }

    *getComponents(document: Document) {
        yield document.createTextNode(this.text);
    }
}