import { ProjectPage } from '../project-page.js';
import { WebpageComponent } from '../components/webpage-component.js';
import { RichTextToken } from './rich-text-token.js';

export class ParagraphComponent extends WebpageComponent {
    /**
     * The `RichTextToken` objects that make up the paragraph.
     * @private
     * @type {RichTextToken[]}
     */
    tokens;

    /**
     * Create a new `ParagraphComponent`.
     * @param {...RichTextToken} tokens The tokens that make up the paragraph.
     */
    constructor(...tokens) {
        super();

        this.tokens = tokens;
    }

    *getStylesheets() {
        yield '/css/paragraph.css';
    }

    /**
     * Sets up the paragraph component.
     * @param {WebpageComponent | null} parentComponent
     * @param {ProjectPage} projectPage
     */
    async setupComponent(parentComponent, projectPage) {
    }

    /**
     * Create a new `ParagraphComponent`.
     * @param {Document} document
     */
    createElement(document) {
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