import { Stylesheet } from "../../elements/stylesheet.js";
import { WebpageElement } from "../../elements/webpage-element.js";
import { ProjectPage } from "../project-page.js";
import { WebpageComponent } from "./webpage-component.js";

export class ItemComponent implements WebpageComponent {
    private content: WebpageComponent[];

    constructor(private flex: number = 1, content: Iterable<WebpageComponent>) {
        this.content = [ ...content ];
    }

    createElement(document: Document): HTMLElement {
        const element = document.createElement('div');
        element.classList.add('item-component');
        element.style.flex = this.flex.toString();

        for (const component of this.content) {
            element.appendChild(component.createElement(document));
        }

        return element;
    }

    async setupComponent(parentComponent: WebpageComponent, projectPage: ProjectPage): Promise<void> {
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