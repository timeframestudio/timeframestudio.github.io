import { Stylesheet } from "../../elements/stylesheet.js";
import { WebpageElement } from "../../elements/webpage-element.js";
import { WebpageComponent } from "./webpage-component.js";

export class HeadingComponent extends WebpageComponent {
    /**
     * The size of the heading.
     * @type {number}
     */
    size = 1;

    /**
     * The text of the heading.
     * @type {string}
     */
    text = '';

    /**
     * Create a new `HeadingComponent`.
     * @param {string} text The text of the heading.
     * @param {number} [size] The size of the heading.
     */
    constructor(text, size = 1) {
        super();

        this.text = text;
        this.size = size;
    }

    /**
     * Gets the `WebpageElement`s used by the heading component.
     * @returns {Iterable<WebpageElement>}
     */
    *getWebpageElements() {
        yield new Stylesheet({ url: '/css/heading.css' });
    }

    /**
     * Create an element for the heading component.
     * @param {Document} document 
     * @returns {HTMLDivElement}
     */
    createElement(document) {
        const heading = document.createElement('div');
        heading.classList.add('heading');

        heading.textContent = this.text;
        heading.classList.add('heading-size-' + this.size);

        return heading;
    }
}