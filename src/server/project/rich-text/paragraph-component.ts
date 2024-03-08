import { Stylesheet } from '../../elements/stylesheet.js';
import { WebpageComponent } from '../components/webpage-component.js';
import { ProjectPage } from '../project-page.js';

export class ParagraphComponent implements WebpageComponent {
    private children: WebpageComponent[];

    constructor(...tokens: WebpageComponent[]) {
        this.children = tokens;
    }

    *getWebpageElements() {
        yield new Stylesheet('/css/paragraph.css');
    }

    async setupComponent(parentComponent: WebpageComponent, projectPage: ProjectPage): Promise<void> {
    }

    createElement(document: Document) {
        const section = document.createElement('div');
        section.classList.add('rich-text-paragraph-section');

        for (let child of this.children) {
            if (!child) continue;

            section.appendChild(child.createElement(document));
        }

        return section;
    }
}