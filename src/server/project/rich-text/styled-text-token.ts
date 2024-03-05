import { RichTextToken } from "./rich-text-token.js";

/**
 * A `StyledTextToken` represents a piece of text that is formatted either bold or italic.
 * It outputs an HTML span element with the class `styled-text-bold` or `styled-text-italic`.
 */
export class StyledTextToken implements RichTextToken {
    private contents: RichTextToken[];

    constructor(private format: 'bold' | 'italic', ...contents: RichTextToken[]) {
        this.contents = contents;
    }

    *getComponents(document: Document) {
        const span = document.createElement('span');
        span.classList.add('styled-text-' + this.format);

        for (let token of this.contents) {
            for (let component of token.getComponents(document)) {
                span.appendChild(component);
            }
        }

        yield span;
    }
}