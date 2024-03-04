import { WebpageElement } from "./webpage-element.js";

/**
 * The `Script` class represents a script that can be added to a webpage.
 * It can be added to the head or body of the page, and can be either a
 * module or regular script.
 */
export class Script extends WebpageElement {
    /**
     * @param {Object} options The options for the script
     * @param {string} [options.url] The URL of the script
     * @param {string} [options.raw] The raw code of the script
     * @param {string} [options.type] The type of the script (module or regular)
     * @param {string} [options.location] The location of the script (head or body)
     * @param {boolean} [options.preferred] Whether the script should be added before
     * others in the same location
     */
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
        // Check if the script is already added
        for (const script of document.querySelectorAll('script')) {
            if (script.src == this.url) return;
            if (script.innerHTML == this.raw) return;
        }

        // Create the script element
        const scriptElement = document.createElement('script');
        if (this.url) scriptElement.src = this.url;
        if (this.raw) scriptElement.innerHTML = this.raw;
        scriptElement.type = this.type;

        // Get the target parent element
        let target = this.location == 'head' ? document.head : document.body;

        // Add the script to the target location
        if (this.preferred) {
            target.insertBefore(scriptElement, target.querySelector('script'));
        } else {
            target.appendChild(scriptElement);
        }
    }
}