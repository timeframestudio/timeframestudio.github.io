import { RichTextToken } from "./rich-text-token.js";

/**
 * A token representing a list item for a `ListTextToken`.
 */
export class ListItemTextToken extends RichTextToken {
    /**
     * Create a new `ListItemTextToken`.
     * @param {RichTextToken[]} contents The contents of the list item.
     */
    constructor(...contents) {
        super();

        this.contents = contents;
    }

    *getComponents(document) {
        const li = document.createElement('li');
        
        for (let token of this.contents) {
            for (let component of token.getComponents(document)) {
                li.appendChild(component);
            }
        }

        yield li;
    }
}