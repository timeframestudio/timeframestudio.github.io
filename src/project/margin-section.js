import { ProjectSection } from "./project-section.js";
import { wrapColumnLayout } from "./wrap-column-layout.js";

export class MarginSection extends ProjectSection {
    *getStylesheets() {
        yield '/css/margin.css';
    }

    async setup(data, project) {
    }

    createElement(document, isSubsection) {
        const element = document.createElement('div');
        element.classList.add('margin-section');

        return element;
    }
}