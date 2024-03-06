import { RichTextToken } from "./rich-text-token.js";

/**
 * A `LinkTextToken` represents a hyperlink, which is rendered into
 * an anchor element with text and an href.
 */
export class LinkTextToken implements RichTextToken {
    constructor(private text: string, private url: string, private target: '_self' | '_blank' = '_blank') {
    }

    *getComponents(document: Document) {
        const a = document.createElement('a');
        a.classList.add('rich-text-link');
        a.href = this.url;
        a.textContent = this.text;

        yield a;
    }
}