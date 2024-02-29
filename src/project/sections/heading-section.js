import { JSDOM } from 'jsdom';
import { ProjectSection } from "../project-section.js";
import { wrapColumnLayout } from "../wrap-column-layout.js";

export class HeadingSection extends ProjectSection {
    constructor() {
        super();
    }

    async setup(data, project) {
        if (typeof data.text != 'string') {
            console.warn('Heading section requires a string typed text property');
            return;
        }

        if (typeof data.size != 'number') {
            console.warn('Heading section requires a number typed size property');
            return;
        }

        this.text = data.text;
        this.size = data.size;
    }

    createElement(document, isSubsection) {
        const fragment = JSDOM.fragment(`
            <div class="heading">
            </div>
        `);

        const target = fragment.querySelector('.heading');

        target.textContent = this.text || 'No text';
        target.classList.add('heading-size-' + this.size);

        return wrapColumnLayout(fragment.children[0], document, isSubsection);
    }
}