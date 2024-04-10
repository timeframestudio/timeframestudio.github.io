import { Stylesheet } from "../../../elements/stylesheet.js";
import { BaseWebpageComponent } from "../base-webpage-component.js";

export class DividerComponent extends BaseWebpageComponent {
    *getWebpageElements() {
        yield new Stylesheet('/css/divider.css');
    }

    createElement(document: Document) {
        const divider = document.createElement('div');
        divider.classList.add('divider-component');

        return divider;
    }
}