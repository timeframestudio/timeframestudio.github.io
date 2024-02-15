import { ProjectSection } from "./project-section.js";
import { JSDOM } from 'jsdom';

export class DescriptionSection extends ProjectSection {
    constructor() {
        super();
    }

    createElement() {
        const fragment = JSDOM.fragment(`
            <div class="project-description">
                <div class="column-layout">
                    <div class="column-side"></div>
                    <div class="column-center">
                        <div class="heading">Project Overview</div>
                        <div class="target-description"></div>
                    </div>
                    <div class="column-side"></div>
                </div>
            </div>
        `);

        const target = fragment.querySelector('.target-description');
        target.textContent = this.project.description;
        target.classList.remove('target-description');

        return fragment.children[0];
    }
}