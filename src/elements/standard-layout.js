import { WebpageElement } from "./webpage-element.js";
import { Navigation } from "./navigation.js";
import { Search } from "./search.js";
import { Footer } from "./footer.js";
import { Stylesheet } from "./stylesheet.js";

/**
 * The `StandardLayout` class represents the standard layout of a webpage, with a navigation
 * bar at the top, a search bar, and a footer at the bottom. It also includes the main, header,
 * and font stylesheets.
 */
export class StandardLayout extends WebpageElement {
    useHeader() {
        this.header = true;
    }

    useMargins() {
        this.margins = true;
    }

    useTint() {
        this.tint = true;
    }

    useHeadings() {
        this.headings = true;
    }

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

        if (this.header) {
            const header = new Stylesheet({ url: '/css/header.css' });
            header.add(document);
        }

        if (this.tint) {
            const tint = new Stylesheet({ url: '/css/tint.css' });
            tint.add(document);
        }

        if (this.margins) {
            const margins = new Stylesheet({ url: '/css/margin.css' });
            margins.add(document);
        }

        if (this.headings) {
            const headings = new Stylesheet({ url: '/css/heading.css' });
            headings.add(document);
        }
    }
}