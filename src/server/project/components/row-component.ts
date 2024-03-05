import { JSDOM } from 'jsdom';
import { WebpageComponent } from "./webpage-component.js";
import { Stylesheet } from '../../elements/stylesheet.js';
import { ProjectPage } from '../project-page.js';

export class RowComponent implements WebpageComponent {
    items: WebpageComponent[];

    constructor(items: Iterable<WebpageComponent>) {
        this.items = [ ...items ];
    }

    setupComponent(parentComponent: WebpageComponent, projectPage: ProjectPage): Promise<void> {
        return Promise.resolve();
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