import { JSDOM } from 'jsdom';
import { WebpageComponent } from "./webpage-component.js";
import { Stylesheet } from '../../elements/stylesheet.js';
import { GeneratedPage } from '../generated-page.js';
import { BaseWebpageComponent } from './base-webpage-component.js';

export class RowComponent extends BaseWebpageComponent {
    items: WebpageComponent[];

    constructor(items: Iterable<WebpageComponent>) {
        super();

        this.items = [ ...items ];
    }

    async setupComponent(parentComponent: WebpageComponent, projectPage: GeneratedPage): Promise<void> {
        for (const item of this.items) {
            await item.setupComponent(this, projectPage);
        }
    }

    *getWebpageElements() {
        yield new Stylesheet('css/row.css');

        for (const item of this.items) {
            yield* item.getWebpageElements();
        }
    }
    
    createElement(document: Document) {
        const row = document.createElement('div');
        row.classList.add('row-component');

        for (const entry of this.items) {
            const element = entry.createElement(document);
            
            row.appendChild(element);
        }

        return row;
    }
}