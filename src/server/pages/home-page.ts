import fs from "fs/promises";
import { JSDOM } from "jsdom";
import { Script } from "../elements/script.js";
import { StandardLayout } from "../elements/standard-layout.js";
import { prettyPrint } from "../utils/pretty-print.js";
import { CachedWebpage } from "./cached-webpage.js";

export class HomePage extends CachedWebpage {
    async generateWebpage() {
        const homeTemplate = await fs.readFile('./public/home.html');

        const dom = new JSDOM(homeTemplate);
        
        const layout = new StandardLayout({
            header: true,
            headings: true,
            margins: true,
            padded: true
        });
        layout.add(dom.window.document);

        const worldMap = new Script('/scripts/world-map.js', { location: 'body' });
        worldMap.add(dom.window.document);
        
        let html = prettyPrint(dom.serialize());

        dom.window.close();

        return html;
    }
}