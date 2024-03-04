import { WebpageElement } from "../../elements/webpage-element.js";
import { ProjectPage } from "../project-page.js";

/**
 * The `WebpageComponent` class represents an element that can be added to a webpage,
 * along with some `WebpageElement`s such as scripts or stylesheets.
 * @abstract
 */
export class WebpageComponent {
    /**
     * Returns a list of `WebpageElement`s to add to the page
     * @returns {Iterable<WebpageElement>}
     * @abstract
     */
    *getWebpageElements() {
    }

    /**
     * Returns the element
     * @param {Document} document
     * @returns {HTMLElement}
     * @abstract
     */
    createElement(document) {
        throw new Error('The abstract method WebpageComponent.createElement must be implemented by all subclasses');
    }

    /**
     * Sets up the component asynchronusly. All subcomponents should be set up
     * in this method.
     * @param {WebpageComponent | null} parentComponent
     * @param {ProjectPage} projectPage
     * @abstract
     */
    async setupComponent(parentComponent, projectPage) {
    }
}