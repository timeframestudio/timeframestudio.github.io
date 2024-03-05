import { Stylesheet } from "../../elements/stylesheet.js";
import { ProjectPage } from "../project-page.js";
import { WebpageComponent } from "./webpage-component.js";

export class MarginSection implements WebpageComponent {
    setupComponent(parentComponent: WebpageComponent, projectPage: ProjectPage): Promise<void> {
        return Promise.resolve();
    }

    *getWebpageElements() {
        yield new Stylesheet('css/margin.css');
    }

    createElement(document: Document) {
        const element = document.createElement('div');
        element.classList.add('margin-component');

        return element;
    }
}