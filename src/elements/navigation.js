import { JSDOM } from "jsdom";
import { WebpageElement } from "./webpage-element.js";
import { Stylesheet } from "./stylesheet.js";
import { Script } from "./script.js";

export class Navigation extends WebpageElement {
    add(document) {
        const margin = document.createElement('div');
        margin.classList.add('navigation-margin');

        document.body.prepend(margin);

        const fragment = JSDOM.fragment(`
            <div class="column-layout navigation-bar">
                <div class="column-side"></div>
                <div class="column-center column-layout">
                    <a class="navigation-title" href="/">Khan Lab Studios</a>
                    <a class="navigation-link search-link" href="#search">Search</a>
                    <a class="navigation-link" href="/about">About</a>
                </div>
                <div class="column-side"></div>
            </div>
        `);

        document.body.prepend(fragment.children[0]);

        const stylesheet = new Stylesheet({ url: '/css/navigation.css' });
        stylesheet.add(document);

        const script = new Script({ url: '/scripts/navigation.js' });
        script.add(document);
    }
}