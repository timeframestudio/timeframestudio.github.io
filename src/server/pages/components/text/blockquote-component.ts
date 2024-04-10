import { Stylesheet } from '../../../elements/stylesheet.js';
import { WebpageComponent } from '../webpage-component.js';
import { GeneratedPage } from '../../generated-page.js';

export class BlockquoteComponent implements WebpageComponent {
    private children: WebpageComponent[];

    constructor(...tokens: WebpageComponent[]) {
        this.children = tokens;
    }

    *getWebpageElements() {
    }

    async setupComponent(parentComponent: WebpageComponent, projectPage: GeneratedPage): Promise<void> {
    }

    createElement(document: Document) {
        const section = document.createElement('div');
        section.classList.add('rich-text-blockquote');

        for (let child of this.children) {
            if (!child) continue;

            section.appendChild(child.createElement(document));
        }

        return section;
    }
}