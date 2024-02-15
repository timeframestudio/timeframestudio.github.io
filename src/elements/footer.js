import { JSDOM } from "jsdom";
import { WebpageElement } from "./webpage-element.js";
import { Stylesheet } from "./stylesheet.js";

export class Footer extends WebpageElement {
    add(document) {
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

        const stylesheet = new Stylesheet({ url: '/css/footer.css' });
        stylesheet.add(document);
    }
}