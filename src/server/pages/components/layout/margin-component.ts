import { Stylesheet } from "../../../elements/stylesheet.js";
import { WebpageSection } from "../../sections/webpage-section.js";
import { WebpageComponent } from "../webpage-component.js";

export class MarginComponent extends WebpageSection implements WebpageComponent {
    constructor(private size: MarginComponent.MarginSize = MarginComponent.MarginSize.Normal) {
        super();
    }

    *getWebpageElements() {
        yield new Stylesheet('/css/margin.css');
    }

    createElement(document: Document) {
        const element = document.createElement('div');
        element.classList.add(this.size == MarginComponent.MarginSize.Normal ? 'margin-component' : 'thin-margin-component');

        return element;
    }
}

export namespace MarginComponent {
    export enum MarginSize {
        Thin,
        Normal
    }
}