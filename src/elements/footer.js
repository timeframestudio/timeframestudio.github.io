import { JSDOM } from "jsdom";

export function addFooter(document) {
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
}