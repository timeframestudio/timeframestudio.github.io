import { WebpageElement } from "./webpage-element.js";

/**
 * The `Stylesheet` class represents a stylesheet that can be added to a webpage.
 * An instance can be created with either a URL or raw CSS code.
 */
export class Stylesheet implements WebpageElement {
    constructor(private url: string) {
    }

    add(document: Document) {
        for (const link of document.querySelectorAll('link')) {
            if (link.href == this.url) return;
        }

        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = this.url;

        document.head.appendChild(linkElement);
    }
}