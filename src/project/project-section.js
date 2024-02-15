import { JSDOM } from 'jsdom';

export class ProjectSection {
    /**
     * Returns a list of stylesheets to add to the page
     * @returns {Iterable<string>}
     */
    *getStylesheets() {
    }

    /**
     * Returns a list of scripts to add to the page
     * @returns {Iterable<string>}
     */
    *getScripts() {
    }

    /**
     * Returns the element to add to the page
     * @param {Document} document
     * @returns {HTMLElement}
     */
    createElement(document) {
    }

    /**
     * Sets up the section asynchronusly
     */
    async setup() {
    }
}