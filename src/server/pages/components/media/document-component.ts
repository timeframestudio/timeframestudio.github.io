import { Stylesheet } from "../../../elements/stylesheet.js";
import { WebpageElement } from "../../../elements/webpage-element.js";
import { EmbedComponent } from "./embed-component.js";

export class DocumentComponent extends EmbedComponent {
    constructor(embedURL: string, private linkURL?: string) {
        super(embedURL);
    }

    *getWebpageElements(): Iterable<WebpageElement> {
        yield new Stylesheet('/css/document.css');
        yield* super.getWebpageElements();
    }

    createElement(document: Document): Node {
        const element = super.createElement(document) as HTMLDivElement;
        element.classList.add('document-component');

        if (this.linkURL) {
            const link = document.createElement('a');
            link.classList.add('document-link');
            link.href = this.linkURL;
            link.target = "_blank";

            const icon = document.createElement('img');
            icon.src = '/assets/open-in-new.svg';
            icon.alt = 'Open in new tab';
            icon.classList.add('document-link-icon');

            link.appendChild(icon);
            element.appendChild(link);
        }

        return element;
    }
}