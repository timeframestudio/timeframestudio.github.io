import fs from "fs/promises";
import { JSDOM } from "jsdom";
import { StandardLayout } from "../elements/standard-layout.js";
import { ProjectSummaries } from "../elements/project-summaries.js";

export class AboutLoader {
    constructor() {
        this.html = null;
    }

    async setup() {
        const template = await fs.readFile('./dist/about.html');

        const dom = new JSDOM(template);

        const layout = new StandardLayout();
        layout.add(dom.window.document);

        const summaries = new ProjectSummaries();
        summaries.add(dom.window.document);

        this.html = dom.serialize();
    }

    getAboutHTML() {
        return this.html;
    }
}