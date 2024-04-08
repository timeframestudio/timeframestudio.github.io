import { JSDOM } from "jsdom";
import { StandardLayout } from "../elements/standard-layout.js";
import { WebpageElement } from "../elements/webpage-element.js";
import { CachedWebpage } from "./cached-webpage.js";
import { prettyPrint } from "../utils/pretty-print.js";
import { WebpageSection } from "./sections/webpage-section.js";
import { PageResources } from "./page-resources.js";

export class GeneratedPage extends CachedWebpage {
    private webpageElements: Set<WebpageElement> = new Set();
    private pageSections: WebpageSection[] = [];
    private pageResources: PageResources;

    bindResources(resources: PageResources) {
        this.pageResources = resources;
    }

    getResources() {
        return this.pageResources;
    }

    async generateWebpage() {
        this.addWebpageElements(new StandardLayout());

        const jsdom = new JSDOM();
        const document = jsdom.window.document;

        let sectionElements: Set<WebpageElement> = new Set();

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

        document.title = this.pageResources.getPageTitle();

        let html = prettyPrint(jsdom.serialize());

        jsdom.window.close();

        return html;
    }

    async clearCache(): Promise<void> {
        this.webpageElements.clear();
        this.pageSections = [];

        super.clearCache();
    }

    protected addWebpageElements(...elements: WebpageElement[]) {
        for (const element of elements) {
            this.webpageElements.add(element);
        }
    }

    protected addPageSections(...sections: WebpageSection[]) {
        for (const section of sections) {
            this.pageSections.push(section);
        }
    }
}