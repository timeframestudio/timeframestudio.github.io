import { Stylesheet } from "../../../elements/stylesheet.js";
import { BaseWebpageComponent } from "../base-webpage-component.js";

export class HeadingComponent extends BaseWebpageComponent {
    constructor(private text: string, private size = 1) {
        super();
    }

    *getWebpageElements() {
        yield new Stylesheet('/css/heading.css');
    }

    createElement(document: Document) {
        const heading = document.createElement('div');
        heading.classList.add('heading');

        heading.textContent = this.text;
        heading.classList.add('heading-size-' + this.size);

        return heading;
    }
}