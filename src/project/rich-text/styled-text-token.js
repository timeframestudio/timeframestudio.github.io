import { RichTextToken } from "./rich-text-token.js";

/**
 * A `StyledTextToken` represents a piece of text that is formatted either bold or italic.
 * It outputs an HTML span element with the class `styled-text-bold` or `styled-text-italic`.
 */
export class StyledTextToken extends RichTextToken {
    /**
     * Create a new `StyledTextToken`.
     * @param {RichTextToken[]} contents 
     * @param {'bold' | 'italic'} format 
     */
    constructor(contents, format) {
        super();

        if (!Array.isArray(contents)) {
            console.warn("The contents property of a styled token must be an array of tokens.");

            this.contents = [];
        } else {
            this.contents = contents;
        }

        if (![ 'bold', 'italic' ].includes(format)) {
            console.warn("The format property of a styled token must be 'bold' or 'italic'.");

            format = 'bold';
        } else {
            this.format = format;
        }
    }

    *getComponents(document) {
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