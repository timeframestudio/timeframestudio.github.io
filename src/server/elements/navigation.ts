import { JSDOM } from "jsdom";
import { WebpageElement } from "./webpage-element.js";
import { Stylesheet } from "./stylesheet.js";
import { Script } from "./script.js";

/**
 * The `Navigation` class can add the navigation bar at the top of the page. It
 * also adds the navigation stylesheet and script.
 */
export class Navigation implements WebpageElement {
    constructor(private showLinks = true) {
    }

    add(document: Document) {
        // The navigation bar is fixed, so we need to add a margin to the top of
        // the page to prevent a bit of the content from being hidden behind the
        // navigation bar.
        const margin = document.createElement('div');
        margin.classList.add('navigation-margin');
        document.body.prepend(margin);

        // The HTML code for the navigation bar is defined here:
        const fragment = this.showLinks ? JSDOM.fragment(`
                <div class="column-layout navigation-bar">
                    <div class="column-side"></div>
                    <div class="column-center column-layout">
                        <a class="navigation-title" href="/">Timeframe Studios</a>
                        <a class="navigation-link search-link" href="#search">Search</a>
                        <a class="navigation-link" href="/about">About</a>
                    </div>
                    <div class="column-side"></div>
                </div>
            `) : JSDOM.fragment(`
                <div class="column-layout navigation-bar">
                    <div class="column-side"></div>
                </div>
            `);

        document.body.prepend(fragment.children[0]);

        // Add the stylesheet (css/navigation.css)
        const stylesheet = new Stylesheet('/css/navigation.css');
        stylesheet.add(document);

        if (this.showLinks) {
            // Add the script (scripts/navigation.js)
            const script = new Script('/scripts/navigation.js', { location: 'body' });
            script.add(document);
        }
    }
}