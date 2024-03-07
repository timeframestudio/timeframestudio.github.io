import { BaseWebpageComponent } from "../components/base-webpage-component.js";
import { WebpageComponent } from "../components/webpage-component.js";
import { ProjectPage } from "../project-page.js";
import { ListItemTextComponent } from "./list-item-text-component.js";

/**
 * A `ListTextComponent` represents an ordered or unordered list, which is rendered into
 * a <ul> or <ol> element with list items.
 */
export class ListTextComponent extends BaseWebpageComponent {
    private items: ListItemTextComponent[];
    
    constructor(private type: "ordered" | "unordered", ...items: ListItemTextComponent[]) {
        super();

        this.type = type;
        this.items = items;
    }

    async setupComponent(parentComponent: WebpageComponent, projectPage: ProjectPage): Promise<void> {
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
        const list = document.createElement(this.type === 'ordered' ? 'ol' : 'ul');

        for (let item of this.items) {
            list.appendChild(item.createElement(document));
        }

        return list;
    }
}