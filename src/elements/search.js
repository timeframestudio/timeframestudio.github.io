import { JSDOM } from "jsdom";
import { WebpageElement } from "./webpage-element.js";
import { Stylesheet } from "./stylesheet.js";
import { Script } from "./script.js";

export class Search extends WebpageElement {
    add(document) {
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

        const stylesheet = new Stylesheet({ url: '/css/search.css' });
        stylesheet.add(document);

        const script = new Script({ url: '/scripts/search.js' });
        script.add(document);
    }
}