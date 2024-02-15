import { JSDOM } from "jsdom";
import fs from "fs/promises";

export class HomeLoader {
    constructor(summaries) {
        this.home = null;
        this.summaries = summaries;
    }

    async setup() {
        const homeTemplate = await fs.readFile('./dist/home.html');

        const dom = new JSDOM(homeTemplate);

        const script = dom.window.document.createElement('script');
        script.innerHTML = `window._projectSummaryData = ${JSON.stringify(this.summaries)};`;
        dom.window.document.head.appendChild(script);

        this.home = dom.serialize();
    }

    getHomeHTML() {
        return this.home;
    }
}