import { Stylesheet } from "../../elements/stylesheet.js";
import { WebpageComponent } from "./webpage-component.js";

export class MarginSection extends WebpageComponent {
    /**
     * Get the webpage elements for the margin component.
     */
    *getWebpageElements() {
        yield new Stylesheet({ url: 'css/margin.css' });
    }

    /**
     * Create an element for the margin component.
     * @param {Document} document 
     * @returns {HTMLDivElement}
     */
    createElement(document) {
        const element = document.createElement('div');
        element.classList.add('margin-component');

        return element;
    }
}