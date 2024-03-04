import { JSDOM } from "jsdom";
import { WebpageElement } from "./webpage-element.js";
import { Stylesheet } from "./stylesheet.js";
import { Script } from "./script.js";

/**
 * The `Search` class represents a search popup that can be added to the page,
 */
export class Search extends WebpageElement {
    add(document) {
        // The HTML code for the search popup is defined here:
        const fragment = JSDOM.fragment(`
            <div class="search-popup-background">
                <div class="search-popup-padding-top"></div>
                <div class="search-popup-wrapper">
                    <div class="search-popup-padding-side"></div>
                    <div class="search-popup">
                        <div class="search-header">
                            <input type="text" class="search-bar" placeholder="Search projects...">
                            <img src="/assets/close.svg" class="search-close-button">
                        </div>
                        <div class="search-results"></div>
                    </div>
                    <div class="search-popup-padding-side"></div>
                </div>
                <div class="search-popup-padding-bottom"></div>
            </div>
        `);

        document.body.prepend(fragment.children[0]);

        // Add the stylesheet (css/search.css)
        const stylesheet = new Stylesheet({ url: '/css/search.css' });
        stylesheet.add(document);

        // Add the script (scripts/search.js)
        const script = new Script({ url: '/scripts/search.js', location: 'body' });
        script.add(document);
    }
}