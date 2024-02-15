import { JSDOM } from "jsdom";
import fs from "fs/promises";
import { addNavigationBar } from "../elements/navigation.js";
import { addSearch } from "../elements/search.js";
import { addFooter } from "../elements/footer.js";

export class HomeLoader {
    constructor(summaryInjector) {
        this.home = null;
        this.summaryInjector = summaryInjector;
    }

    async setup() {
        const homeTemplate = await fs.readFile('./dist/home.html');

        const dom = new JSDOM(homeTemplate);

        this.summaryInjector.injectSummaries(dom.window.document);
        addNavigationBar(dom.window.document);
        addSearch(dom.window.document);
        addFooter(dom.window.document);

        this.home = dom.serialize();
    }

    getHomeHTML() {
        return this.home;
    }
}