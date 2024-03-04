import { RichTextToken } from "./rich-text-token.js";

/**
 * A `LinkTextToken` represents a hyperlink, which is rendered into
 * an anchor element with text and an href.
 */
export class LinkTextToken extends RichTextToken {
    /**
     * Create a new `LinkTextToken`.
     * @param {string} text The text to display.
     * @param {string} url The URL to link to.
     * @param {'_self' | '_blank'} target The target for the link.
     */
    constructor(text, url, target = '_blank') {
        super();

        this.text = text;
        this.url = url;
        this.target = target;
    }

    *getComponents(document) {
        const a = document.createElement('a');
        a.classList.add('rich-text-link');
        a.href = this.url;
        a.textContent = this.text;

        yield a;
    }
}