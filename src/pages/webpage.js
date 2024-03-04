export class Webpage {
    async setupWebpage() {
    }

    /**
     * Get the HTML for the page.
     * @returns {string}
     * @abstract
     */
    getPageHTML() {
        return "";
    }
}