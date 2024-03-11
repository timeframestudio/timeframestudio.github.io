import { WebpageElement } from "../../../elements/webpage-element.js";
import { BaseWebpageComponent } from "../base-webpage-component.js";
import { WebpageComponent } from "../webpage-component.js";
import { GeneratedPage } from "../../generated-page.js";

/**
 * A `LinkTextComponent` represents a hyperlink, which is rendered into
 * an anchor element with text and an href.
 */
export class LinkTextComponent extends BaseWebpageComponent {
    constructor(private items: WebpageComponent[], private url: string, private target: '_self' | '_blank' = '_blank') {
        super();
    }

    async setupComponent(parentComponent: WebpageComponent | null, projectPage: GeneratedPage) {
        for (let item of this.items) {
            await item.setupComponent(this, projectPage);
        }
    }

    *getWebpageElements() {
        for (let item of this.items) {
            yield* item.getWebpageElements();
        }
    }

    createElement(document: Document) {
        const a = document.createElement('a');
        a.classList.add('rich-text-link');
        a.href = this.url;
        
        if (this.target) {
            a.target = this.target;
        }

        for (let item of this.items) {
            a.appendChild(item.createElement(document));
        }

        return a;
    }
}