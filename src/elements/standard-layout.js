import { WebpageElement } from "./webpage-element.js";
import { Navigation } from "./navigation.js";
import { Search } from "./search.js";
import { Footer } from "./footer.js";
import { Stylesheet } from "./stylesheet.js";

export class StandardLayout extends WebpageElement {
    add(document) {
        const navigation = new Navigation();
        navigation.add(document);

        const search = new Search();
        search.add(document);

        const footer = new Footer();
        footer.add(document);

        const main = new Stylesheet({ url: '/css/main.css' });
        main.add(document);

        const font = new Stylesheet({ url: '/css/font.css' });
        font.add(document);

        const header = new Stylesheet({ url: '/css/header.css' });
        header.add(document);
    }
}