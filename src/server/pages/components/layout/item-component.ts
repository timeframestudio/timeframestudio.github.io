import { Stylesheet } from "../../../elements/stylesheet.js";
import { GeneratedPage } from "../../generated-page.js";
import { BaseWebpageComponent } from "../base-webpage-component.js";
import { WebpageComponent } from "../webpage-component.js";

export class ItemComponent extends BaseWebpageComponent {
    private content: WebpageComponent[];

    constructor(private flex: number | null, ...content: WebpageComponent[]) {
        super();

        this.content = content;
    }

    createElement(document: Document): HTMLElement {
        const element = document.createElement('div');
        element.classList.add('item-component');
        if (this.flex !== null) element.style.flex = this.flex.toString();

        for (const component of this.content) {
            element.appendChild(component.createElement(document));
        }

        return element;
    }

    async setupComponent(parentComponent: WebpageComponent, projectPage: GeneratedPage): Promise<void> {
        for (const component of this.content) {
            await component.setupComponent(this, projectPage);
        }
    }

    *getWebpageElements() {
        yield new Stylesheet('/css/item.css');

        for (const component of this.content) {
            yield* component.getWebpageElements();
        }
    }
}