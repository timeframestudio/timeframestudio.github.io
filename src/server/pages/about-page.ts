import fs from "fs/promises";
import { JSDOM } from "jsdom";
import { StandardLayout } from "../elements/standard-layout.js";
import { prettyPrint } from "../utils/pretty-print.js";
import { CachedWebpage } from "./cached-webpage.js";

export class AboutPage extends CachedWebpage {
    async generateWebpage() {
        const template = await fs.readFile('./public/about.html');

        const dom = new JSDOM(template);

        const layout = new StandardLayout({
            header: true,
            headings: true,
            margins: true
        });

        layout.add(dom.window.document);

        const html = prettyPrint(dom.serialize());

        dom.window.close();

        return html;
    }
}