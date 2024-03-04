import { WebpageElement } from "../elements/webpage-element.js";
import { ProjectOutline } from "./project-outline.js";
import { JSDOM } from "jsdom";
import { WebpageSection } from "./webpage-section.js";
import { StandardLayout } from "../elements/standard-layout.js";
import { prettyPrint } from "../utils/pretty-print.js";

export class ProjectPage {
    /**
     * The `WebpageElement`s in the project page.
     * @type {Set<WebpageElement>}
     * @readonly
     * @private
     */
    webpageElements = new Set();

    /**
     * The `WebpageSection`s in the project page.
     * @type {WebpageSection[]}
     * @readonly
     * @private
     */
    pageSections = [];

    /**
     * The outline of the project.
     * @type {ProjectOutline}
     * @private
     */
    projectOutline = null;

    /**
     * The HTML of the project page.
     * @type {string}
     * @private
     */
    pageHTML = null;

    constructor() {
    }

    /**
     * Bind the project outline to the project page.
     * @param {ProjectOutline} outline 
     */
    bindProjectOutline(outline) {
        this.projectOutline = outline;
    }

    /**
     * Set up the project page.
     */
    async setup() {
        this.addWebpageElements(new StandardLayout());
        await this.generatePageHTML();
    }

    /**
     * Generate the HTML of the project page.
     * @protected
     */
    async generatePageHTML() {
        const jsdom = new JSDOM();
        const document = jsdom.window.document;

        let sectionElements = new Set();

        for (const section of this.pageSections) {
            await section.setupComponent(null, this);

            const sectionElement = section.createElement(document);
            document.body.appendChild(sectionElement);

            for (const element of section.getWebpageElements()) {
                sectionElements.add(element);
            }
        }

        for (const element of this.webpageElements) {
            element.add(document);
        }

        for (const element of sectionElements) {
            element.add(document);
        }

        this.pageHTML = prettyPrint(jsdom.serialize());
    }

    /**
     * Add one or more `WebpageElement`s to the page.
     * @param  {...WebpageElement | WebpageElement[]} elements
     * @protected
     */
    addWebpageElements(...elements) {
        for (const element of elements) {
            if (element instanceof WebpageElement) {
                this.webpageElements.add(element);
            } else {
                this.addWebpageElements(...element);
            }
        }
    }

    /**
     * Add one or more `WebpageSection`s to the page.
     * @param  {...WebpageSection | WebpageSection[]} sections 
     * @protected
     */
    addPageSections(...sections) {
        for (const section of sections) {
            if (section instanceof WebpageSection) {
                this.pageSections.push(section);
            } else {
                this.addPageSections(...section);
            }
        }
    }

    /**
     * Get the project outline.
     * @returns {ProjectOutline}
     */
    getProjectOutline() {
        return this.projectOutline;
    }

    /**
     * Get the HTML of the project page.
     * @returns {string}
     */
    getPageHTML() {
        return this.pageHTML;
    }
}