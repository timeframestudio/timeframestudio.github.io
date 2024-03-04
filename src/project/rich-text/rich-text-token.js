/**
 * A `RichTextToken` is a single formatted piece of text that can be
 * rendered to DOM elements. It could be
 * * A link — `LinkTextToken`
 * * Bold or italic text — `StyledTextToken`
 * * Plain text — `PlainTextToken`
 * * Bullet points or a numbered list — `ListTextToken`
 * * An indented block of text — `IndentedTextToken`
 * @abstract
 */
export class RichTextToken {
    /**
     * Get the DOM elements that make up this token.
     * @param {Document} document The document the elements will be created in.
     * @returns {Iterable<HTMLElement>}
     */
    getComponents(document) {
        throw new Error('The abstract RichTextToken.getComponents method must be implemented by all subclasses');
    }
}