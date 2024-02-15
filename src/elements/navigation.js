import { JSDOM } from "jsdom";

export function addNavigationBar(document) {
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
}