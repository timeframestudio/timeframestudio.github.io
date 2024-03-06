import { Stylesheet } from '../../elements/stylesheet.js';
import { WebpageComponent } from '../components/webpage-component.js';
import { ProjectPage } from '../project-page.js';
import { RichTextToken } from './rich-text-token.js';

export class ParagraphComponent implements WebpageComponent {
    private tokens: RichTextToken[];

    constructor(...tokens: RichTextToken[]) {
        this.tokens = tokens;
    }

    *getWebpageElements() {
        yield new Stylesheet('/css/paragraph.css');
    }

    async setupComponent(parentComponent: WebpageComponent, projectPage: ProjectPage): Promise<void> {
    }

    createElement(document: Document) {
        const section = document.createElement('div');
        section.classList.add('rich-text-paragraph-section');

        for (let token of this.tokens) {
            if (!token) continue;

            for (let component of token.getComponents(document)) {
                section.appendChild(component);
            }
        }

        return section;
    }
}