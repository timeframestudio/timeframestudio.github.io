import { WebpageElement } from "../../elements/webpage-element.js";
import { ProjectPage } from "../project-page.js";
import { WebpageComponent } from "./webpage-component.js";

export abstract class BaseWebpageComponent implements WebpageComponent {
    getWebpageElements(): Iterable<WebpageElement> {
        return new Set();
    }

    setupComponent(parentComponent: WebpageComponent, projectPage: ProjectPage): Promise<void> {
        return Promise.resolve();
    }

    abstract createElement(document: Document): Node;
}