import { WebpageElement } from "./webpage-element.js";

interface ScriptOptions {
    type?: string;
    location?: string;
    preferred?: boolean;
}

/**
 * The `Script` class represents a script that can be added to a webpage.
 * It can be added to the head or body of the page, and can be either a
 * module or regular script.
 */
export class Script implements WebpageElement {
    private type: string;
    private location: string;
    private preferred: boolean;
    
    constructor(private url: string, { type = 'module', location = 'head', preferred = false }: ScriptOptions = {}) {
        this.type = type;
        this.location = location;
        this.preferred = preferred;
    }

    add(document: Document) {
        // Check if the script is already added
        for (const script of document.querySelectorAll('script')) {
            if (script.src == this.url) return;
        }

        // Create the script element
        const scriptElement = document.createElement('script');
        scriptElement.src = this.url;
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