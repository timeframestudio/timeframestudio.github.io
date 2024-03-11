import { BaseWebpageComponent } from "../base-webpage-component.js";
import { WebpageComponent } from "../webpage-component.js";
import { GeneratedPage } from "../../generated-page.js";

/**
 * A `StyledTextComponent` represents a piece of text that is formatted either bold or italic.
 * It outputs an HTML span element with the class `styled-text-bold` or `styled-text-italic`.
 */
export class StyledTextComponent extends BaseWebpageComponent {
    private contents: WebpageComponent[];

    constructor(private format: 'bold' | 'italic', ...contents: WebpageComponent[]) {
        super();

        this.contents = contents;
    }

    async setupComponent(parentComponent: WebpageComponent, projectPage: GeneratedPage): Promise<void> {
        for (let content of this.contents) {
            await content.setupComponent(this, projectPage);
        }
    }

    *getWebpageElements() {
        for (let content of this.contents) {
            yield* content.getWebpageElements();
        }
    }

    createElement(document: Document) {
        const span = document.createElement('span');
        span.classList.add('styled-text-' + this.format);

        for (let child of this.contents) {
            span.appendChild(child.createElement(document));
        }

        return span;
    }
}