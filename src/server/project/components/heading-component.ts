import { Stylesheet } from "../../elements/stylesheet.js";
import { ProjectPage } from "../project-page.js";
import { WebpageComponent } from "./webpage-component.js";

export class HeadingComponent implements WebpageComponent {
    constructor(private text: string, private size = 1) {
    }
    
    async setupComponent(parentComponent: WebpageComponent, projectPage: ProjectPage): Promise<void> {
    }

    *getWebpageElements() {
        yield new Stylesheet('/css/heading.css');
    }

    createElement(document: Document) {
        const heading = document.createElement('div');
        heading.classList.add('heading');

        heading.textContent = this.text;
        heading.classList.add('heading-size-' + this.size);

        return heading;
    }
}