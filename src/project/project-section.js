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
     * @param {boolean} isSubsection
     * @returns {HTMLElement}
     */
    createElement(document, isSubsection) {
    }

    /**
     * Sets up the section asynchronusly
     * @param {Object} sectionData
     * @param {Project} project
     */
    async setup(sectionData, project) {
    }
}