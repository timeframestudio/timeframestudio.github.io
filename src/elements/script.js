import { WebpageElement } from "./webpage-element.js";

export class Script extends WebpageElement {
    constructor({ url = null, raw = null, type = 'module', location = 'head', preferred = false } = {}) {
        super();
    
        this.url = url;
        this.raw = raw;
        this.type = type;
        this.location = location;
        this.preferred = preferred;

        if (!this.url && !this.raw) {
            throw new Error('Script options must have either a url or raw property');
        }
    }

    /**
     * Adds a script to the page
     * @param {Document} document The document to add the script to
     */
    add(document) {
        for (const script of document.querySelectorAll('script')) {
            if (script.src == this.url) return;
            if (script.innerHTML == this.raw) return;
        }

        const scriptElement = document.createElement('script');
        if (this.url) scriptElement.src = this.url;
        if (this.raw) scriptElement.innerHTML = this.raw;
        scriptElement.type = this.type;

        let target = this.location == 'head' ? document.head : document.body;

        if (this.preferred) {
            target.insertBefore(scriptElement, target.querySelector('script'));
        } else {
            target.appendChild(scriptElement);
        }
    }
}