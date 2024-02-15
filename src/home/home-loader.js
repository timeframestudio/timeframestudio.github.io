import { JSDOM } from "jsdom";
import fs from "fs/promises";

export class HomeLoader {
    constructor(summaryInjector) {
        this.home = null;
        this.summaryInjector = summaryInjector;
    }

    async setup() {
        const homeTemplate = await fs.readFile('./dist/home.html');

        const dom = new JSDOM(homeTemplate);

        this.summaryInjector.injectSummaries(dom.window.document);

        this.home = dom.serialize();
    }

    getHomeHTML() {
        return this.home;
    }
}