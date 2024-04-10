import { GeneratedPage } from "../../generated-page.js";
import { BaseWebpageComponent } from "../base-webpage-component.js";
import { WebpageComponent } from "../webpage-component.js";

export class Tab extends BaseWebpageComponent {
    constructor(private title: string, private content: BaseWebpageComponent[]) {
        super();
    }

    async setupComponent(parentComponent: WebpageComponent, projectPage: GeneratedPage): Promise<void> {
        for (const component of this.content) {
            await component.setupComponent(this, projectPage);
        }
    }

    *getWebpageElements() {
        for (const element of this.content) {
            yield* element.getWebpageElements();
        }
    }

    createTabElement(document: Document) {
        const tab = document.createElement('div');
        tab.classList.add('tab');
        tab.textContent = this.title;

        return tab;
    }

    createElement(document: Document) {
        const content = document.createElement('div');
        content.classList.add('tab-content');

        for (const component of this.content) {
            content.appendChild(component.createElement(document));
        }

        return content;
    }
}