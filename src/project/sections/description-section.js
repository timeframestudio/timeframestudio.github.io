import { ProjectSection } from "../project-section.js";
import { JSDOM } from 'jsdom';
import { wrapColumnLayout } from "../wrap-column-layout.js";

export class DescriptionSection extends ProjectSection {
    constructor() {
        super();
    }

    async setup(data, project) {
        this.project = project;
    }

    createElement(document, isSubsection) {
        const fragment = JSDOM.fragment(`
            <div class="project-description">
                <div class="heading heading-size-1">Project Overview</div>
                <div class="target-description"></div>
            </div>
        `);

        const target = fragment.querySelector('.target-description');
        target.textContent = this.project.description;
        target.classList.remove('target-description');

        return wrapColumnLayout(fragment.children[0], document, isSubsection);
    }
}