import { RichTextToken } from "./rich-text-token.js";

/**
 * A `PlainTextToken` represents a piece of text that is not formatted in any way.
 */
export class PlainTextToken extends RichTextToken {
    /**
     * Create a new `PlainTextToken`.
     * @param {string} text The text to display.
     */
    constructor(text) {
        super();

        this.text = text;
    }

    *getComponents(document) {
        yield document.createTextNode(this.text);
    }
}