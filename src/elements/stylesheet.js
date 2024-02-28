import { WebpageElement } from "./webpage-element.js";

/**
 * The `Stylesheet` class represents a stylesheet that can be added to a webpage.
 * An instance can be created with either a URL or raw CSS code.
 */
export class Stylesheet extends WebpageElement {
    constructor({ url = null, raw = null } = {}) {
        super();
    
        this.url = url;
        this.raw = raw;

        if (!this.url && !this.raw) {
            throw new Error('Stylesheet options must have either a url or raw property');
        }
    }

    /**
     * Adds a stylesheet to the page
     * @param {Document} document The document to add the stylesheet to
     */
    add(document) {
        if (this.url) {
            for (const link of document.querySelectorAll('link')) {
                if (link.href == this.url) return;
            }
    
            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = this.url;
    
            document.head.appendChild(linkElement);
        } else {
            for (const style of document.querySelectorAll('style')) {
                if (style.innerHTML == this.raw) return;
            }

            const styleElement = document.createElement('style');
            styleElement.innerHTML = this.raw;
    
            document.head.appendChild(styleElement);
        }
    }
}