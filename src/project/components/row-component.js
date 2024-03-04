import { JSDOM } from 'jsdom';
import { WebpageComponent } from "./webpage-component.js";
import { Stylesheet } from '../../elements/stylesheet.js';

export class RowComponent extends WebpageComponent {
    /**
     * The items of this row.
     * @type {WebpageComponent[]}
     * @readonly
     * @private
     */
    items;

    /**
     * Create a new `RowComponent`.
     * @param {WebpageComponent[]} items The items of the row.
     */
    constructor(items) {
        super();

        this.items = items;
    }

    *getWebpageElements() {
        yield new Stylesheet({ url: 'css/row.css' });

        for (const item of this.items) {
            yield* item.getWebpageElements();
        }
    }

    /**
     * Create an element for the row component.
     * @param {Document} document 
     * @returns {HTMLDivElement}
     */
    createElement(document) {
        const row = document.createElement('div');
        row.classList.add('row-component');

        for (const entry of this.items) {
            const element = entry.createElement(document);
            
            row.appendChild(element);
        }

        return row;
    }
}