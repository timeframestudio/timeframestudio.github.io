import { WebpageElement } from "../../elements/webpage-element.js";
import { ProjectPage } from "../project-page.js";

/**
 * The `WebpageComponent` interface represents an element that can be added to a webpage,
 * along with some `WebpageElement`s such as scripts or stylesheets.
 */
export interface WebpageComponent {
    getWebpageElements(): Iterable<WebpageElement>;
    createElement(document: Document): Node;
    setupComponent(parentComponent: WebpageComponent, projectPage: ProjectPage): Promise<void>;
}