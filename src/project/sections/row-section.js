import { ProjectSection } from "../project-section.js";
import { JSDOM } from 'jsdom';
import { wrapColumnLayout } from "../wrap-column-layout.js";
import { loadSection } from "../load-section.js";

export class RowSection extends ProjectSection {
    *getStylesheets() {
        yield '/css/row.css';

        for (const subsection of this.subsections) {
            yield* subsection.section.getStylesheets();
        }
    }

    *getScripts() {
        for (const subsection of this.subsections) {
            yield* subsection.section.getScripts();
        }
    }

    async setup(data, project) {
        await this.loadFromData(data, project);
    }

    async loadFromData(data, project) {
        this.subsections = [];

        if (!data.subsections) {
            console.warn('Row sections must have subsections');
            
            return;
        }

        for (const subsectionData of data.subsections) {
            const section = await loadSection(subsectionData, project);
            this.subsections.push({ data: subsectionData, section });
        }
    }

    createElement(document, isSubsection) {
        const fragment = JSDOM.fragment(`
            <div class="row-section"></div>
        `);

        const row = fragment.querySelector('.row-section');

        for (const entry of this.subsections) {
            const element = entry.section.createElement(document, true);
            
            if (element) {
                element.classList.add('row-item');

                if (entry.data.flex) element.classList.add('row-item-flex');

                row.appendChild(element);
            }
        }

        return wrapColumnLayout(fragment.children[0], document, isSubsection);
    }
}