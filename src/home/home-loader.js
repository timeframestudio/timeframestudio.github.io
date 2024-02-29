import fs from "fs/promises";
import { JSDOM } from "jsdom";
import { StandardLayout } from "../elements/standard-layout.js";
import { ProjectSummaries } from "../elements/project-summaries.js";

export class HomeLoader {
    constructor() {
        this.home = null;
    }

    async setup() {
        const homeTemplate = await fs.readFile('./dist/home.html');

        const dom = new JSDOM(homeTemplate);

        const layout = new StandardLayout();
        layout.useHeader();
        layout.useTint();
        layout.add(dom.window.document);

        const summaries = new ProjectSummaries();
        summaries.add(dom.window.document);

        this.home = dom.serialize();

        dom.window.close();
    }

    getHomeHTML() {
        return this.home;
    }
}