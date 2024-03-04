import fs from "fs/promises";
import { JSDOM } from "jsdom";
import { StandardLayout } from "../elements/standard-layout.js";
import { prettyPrint } from "../utils/pretty-print.js";

export class AboutPage {
    constructor() {
        this.html = null;
    }

    async setupWebpage() {
        const template = await fs.readFile('./dist/about.html');

        const dom = new JSDOM(template);

        const layout = new StandardLayout();
        layout.useHeader();
        layout.useTint();
        layout.useMargins();
        layout.useHeadings();
        layout.add(dom.window.document);

        this.html = prettyPrint(dom.serialize());

        dom.window.close();
    }

    getPageHTML() {
        return this.html;
    }
}