import { RichTextToken } from "./rich-text-token.js";

/**
 * A token representing a list item for a `ListTextToken`.
 */
export class ListItemTextToken implements RichTextToken {
    private contents: RichTextToken[];

    constructor(...contents: RichTextToken[]) {
        this.contents = contents;
    }

    *getComponents(document: Document) {
        const li = document.createElement('li');
        
        for (let token of this.contents) {
            for (let component of token.getComponents(document)) {
                li.appendChild(component);
            }
        }

        yield li;
    }
}