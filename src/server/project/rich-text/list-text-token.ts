import { ListItemTextToken } from "./list-item-text-token.js";
import { RichTextToken } from "./rich-text-token.js";

/**
 * A `ListTextToken` represents an ordered or unordered list, which is rendered into
 * a <ul> or <ol> element with list items.
 */
export class ListTextToken implements RichTextToken {
    private items: ListItemTextToken[];
    
    constructor(private type: "ordered" | "unordered", ...items: ListItemTextToken[]) {
        this.type = type;
        this.items = items;
    }

    *getComponents(document: Document) {
        const list = document.createElement(this.type === 'ordered' ? 'ol' : 'ul');

        for (let item of this.items) {
            for (let component of item.getComponents(document)) {
                list.appendChild(component);
            }
        }

        yield list;
    }
}