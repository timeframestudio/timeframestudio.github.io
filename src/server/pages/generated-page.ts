import { JSDOM } from "jsdom";
import { StandardLayout } from "../elements/standard-layout.js";
import { WebpageElement } from "../elements/webpage-element.js";
import { CachedWebpage } from "./cached-webpage.js";
import { prettyPrint } from "../utils/pretty-print.js";
import { WebpageSection } from "./sections/webpage-section.js";
import { CollectionEntry } from "../collection/collection-entry.js";

export class GeneratedPage extends CachedWebpage {
    private webpageElements: Set<WebpageElement> = new Set();
    private pageSections: WebpageSection[] = [];
    private collectionEntry: CollectionEntry | null = null;
    private title: string;

    bindCollectionEntry(resources: CollectionEntry) {
        this.collectionEntry = resources;
    }

    getCollectionEntry() {
        return this.collectionEntry;
    }

    getTitle() {
        return this.title;
    }

    setTitle(title: string) {
        this.title = title;
    }

    async generateWebpage() {
        this.add(new StandardLayout());

        const jsdom = new JSDOM('<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body></body></html>');
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

        document.title = this.title;

        let html = prettyPrint(jsdom.serialize());

        jsdom.window.close();

        return html;
    }

    async clearCache(): Promise<void> {
        this.webpageElements.clear();
        this.pageSections = [];

        super.clearCache();
    }

    protected add(...elements: (WebpageElement | WebpageSection)[]) {
        for (const element of elements) {
            if (element instanceof WebpageSection) this.pageSections.push(element);
            else this.webpageElements.add(element);
        }
    }
}