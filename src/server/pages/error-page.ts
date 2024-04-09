import fs from "fs/promises";
import { JSDOM } from "jsdom";
import { Script } from "../elements/script.js";
import { StandardLayout } from "../elements/standard-layout.js";
import { prettyPrint } from "../utils/pretty-print.js";
import { CachedWebpage } from "./cached-webpage.js";

export class ErrorPage extends CachedWebpage {
    async generateWebpage() {
        const template = await fs.readFile('./public/not-found.html');

        const dom = new JSDOM(template);
        
        const layout = new StandardLayout({
            header: true,
            headings: true
        });
        layout.add(dom.window.document);

        let html = prettyPrint(dom.serialize());

        dom.window.close();

        return html;
    }
}