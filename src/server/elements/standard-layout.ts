import { WebpageElement } from "./webpage-element.js";
import { Navigation } from "./navigation.js";
import { Search } from "./search.js";
import { Footer } from "./footer.js";
import { Stylesheet } from "./stylesheet.js";
import { Favicon } from "./favicon.js";

interface EnabledFeatures {
    header: boolean;
    margins: boolean;
    headings: boolean;
    padded: boolean;
}

/**
 * The `StandardLayout` class represents the standard layout of a webpage, with a navigation
 * bar at the top, a search bar, and a footer at the bottom. It also includes the main, header,
 * and font stylesheets.
 */
export class StandardLayout implements WebpageElement {
    private enabledFeatures: EnabledFeatures;

    constructor(features: Partial<EnabledFeatures> = {}) {
        this.enabledFeatures = {
            header: features.header ?? true,
            margins: features.margins ?? true,
            headings: features.headings ?? true,
            padded: features.padded ?? true
        };
    }

    add(document: Document) {
        const favicon = new Favicon();
        favicon.add(document);

        const navigation = new Navigation();
        navigation.add(document);

        const search = new Search();
        search.add(document);

        const footer = new Footer();
        footer.add(document);

        const main = new Stylesheet('/css/main.css');
        main.add(document);

        const font = new Stylesheet('/css/font.css');
        font.add(document);

        if (this.enabledFeatures.header) {
            const header = new Stylesheet('/css/header.css');
            header.add(document);
        }

        if (this.enabledFeatures.margins) {
            const margins = new Stylesheet('/css/margin.css');
            margins.add(document);
        }

        if (this.enabledFeatures.headings) {
            const headings = new Stylesheet('/css/heading.css');
            headings.add(document);
        }

        if (this.enabledFeatures.padded) {
            const headings = new Stylesheet('/css/padded.css');
            headings.add(document);
        }
    }
}