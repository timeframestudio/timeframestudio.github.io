/**
 * A `RichTextToken` is a single formatted piece of text that can be
 * rendered to DOM elements. It could be
 * * A link — `LinkTextToken`
 * * Bold or italic text — `StyledTextToken`
 * * Plain text — `PlainTextToken`
 * * Bullet points or a numbered list — `ListTextToken`
 * * An indented block of text — `IndentedTextToken`
 */
export interface RichTextToken {
    getComponents(document: Document): Iterable<Node>;
}