import { BaseWebpageComponent } from "../components/base-webpage-component.js";

/**
 * A `PlainTextComponent` represents a piece of text that is not formatted in any way.
 */
export class PlainTextComponent extends BaseWebpageComponent {
    constructor(private text: string) {
        super();
    }

    createElement(document: Document) {
        return document.createTextNode(this.text);
    }
}