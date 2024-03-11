import { BaseWebpageComponent } from "../base-webpage-component.js";
import { WebpageComponent } from "../webpage-component.js";
import { GeneratedPage } from "../../generated-page.js";

/**
 * A component representing a list item for a `ListTextComponent`.
 */
export class ListItemTextComponent extends BaseWebpageComponent {
    private contents: WebpageComponent[];

    constructor(...contents: WebpageComponent[]) {
        super();

        this.contents = contents;
    }

    async setupComponent(parentComponent: WebpageComponent, projectPage: GeneratedPage): Promise<void> {
        for (let component of this.contents) {
            await component.setupComponent(this, projectPage);
        }
    }

    *getWebpageElements() {
        for (let component of this.contents) {
            yield* component.getWebpageElements();
        }
    }

    createElement(document: Document) {
        const li = document.createElement('li');
        
        for (let child of this.contents) {
            li.appendChild(child.createElement(document));
        }

        return li;
    }
}