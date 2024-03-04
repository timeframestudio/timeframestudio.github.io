import { ListItemTextToken } from "./list-item-text-token.js";
import { RichTextToken } from "./rich-text-token.js";

/**
 * A `ListTextToken` represents an ordered or unordered list, which is rendered into
 * a <ul> or <ol> element with list items.
 */
export class ListTextToken extends RichTextToken {
    /**
     * Create a new `ListTextToken`.
     * @param {'ordered' | 'unordered'} type The type of list to create.
     * @param {ListItemTextToken[]} items The items in the list.
     */
    constructor(type, ...items) {
        super();

        if (![ 'ordered', 'unordered' ].includes(type)) {
            throw new Error('Invalid type for list text token');
        }

        this.type = type;
        this.items = items;
    }

    *getComponents(document) {
        const list = document.createElement(this.type === 'ordered' ? 'ol' : 'ul');

        for (let item of this.items) {
            for (let component of item.getComponents(document)) {
                list.appendChild(component);
            }
        }

        yield list;
    }
}