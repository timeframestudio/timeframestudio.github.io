import { BaseWebpageComponent } from "../base-webpage-component.js";

export class LineBreakComponent extends BaseWebpageComponent {
    createElement(document: Document): Node {
        const lineBreak = document.createElement('div');
        lineBreak.classList.add('rich-text-line-break');

        return lineBreak;
    }
}