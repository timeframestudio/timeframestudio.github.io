import { loadSection } from "../load-section.js";
import { ProjectSection } from "../project-section.js";
import { wrapColumnLayout } from "../wrap-column-layout.js";

export class TintedSection extends ProjectSection {
    *getStylesheets() {
        yield '/css/tint.css';

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
            console.warn('Tinted sections must have subsections');
            
            return;
        }

        for (const subsectionData of data.subsections) {
            const section = await loadSection(subsectionData, project);
            this.subsections.push({ data: subsectionData, section });
        }
    }

    createElement(document, isSubsection) {
        const section = document.createElement('div');

        for (const entry of this.subsections) {
            const element = entry.section.createElement(document, true);
            
            if (element) {
                section.appendChild(element);
            }
        }

        const wrapper = wrapColumnLayout(section, document, isSubsection);
        wrapper.classList.add('tinted-section');

        return wrapper;
    }
}