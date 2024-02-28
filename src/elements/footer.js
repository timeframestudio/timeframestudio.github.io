import { JSDOM } from "jsdom";
import { WebpageElement } from "./webpage-element.js";
import { Stylesheet } from "./stylesheet.js";

/**
 * The `Footer` class represents a footer that can be added at the bottom
 * of the page, along with the associated stylesheet.
 */
export class Footer extends WebpageElement {
    add(document) {
        // The HTML code for the footer is defined here:
        const fragment = JSDOM.fragment(`
            <div class="column-layout footer">
                <div class="column-side"></div>
                <div class="column-center">
                    Made by <b>Khan Lab Studios</b>
                </div>
                <div class="column-side"></div>
            </div>
        `);

        document.body.appendChild(fragment.children[0]);

        // Add the stylesheet (css/footer.css)
        const stylesheet = new Stylesheet({ url: '/css/footer.css' });
        stylesheet.add(document);
    }
}