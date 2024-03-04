import { Stylesheet } from "../../elements/stylesheet.js";
import { WebpageElement } from "../../elements/webpage-element.js";
import { WebpageComponent } from "./webpage-component.js";

export class ItemComponent extends WebpageComponent {
    /**
     * The value of the CSS property `flex`.
     * @type {number}
     * @readonly
     * @private
     */
    flex;

    /**
     * The contents of the row or column item.
     * @type {WebpageComponent}
     * @readonly
     * @private
     */

    /**
     * Create a new `ItemComponent`.
     * @param {number} flex The value of the CSS property `flex`.
     */
    constructor(flex) {
        super();

        this.flex = flex;
    }

    /**
     * Gets the `WebpageElement`s used by the item component.
     * @returns {Iterable<WebpageElement>}
     */
    *getWebpageElements() {
        yield new Stylesheet({ url: '/css/item.css' });
    }
}