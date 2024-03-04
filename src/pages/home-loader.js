import fs from "fs/promises";
import { JSDOM } from "jsdom";
import { StandardLayout } from "../elements/standard-layout.js";
import { prettyPrint } from "../utils/pretty-print.js";
import { Script } from "../elements/script.js";

export class HomePage {
    constructor() {
        this.home = null;
    }

    async setupWebpage() {
        const homeTemplate = await fs.readFile('./dist/home.html');

        const dom = new JSDOM(homeTemplate);
        
        const layout = new StandardLayout();
        layout.useHeader();
        layout.useTint();
        layout.useMargins();
        layout.useHeadings();
        layout.add(dom.window.document);

        const worldMap = new Script({ url: '/scripts/world-map.js', location: 'body' });
        worldMap.add(dom.window.document);
        
        this.home = prettyPrint(dom.serialize());

        dom.window.close();
    }

    getPageHTML() {
        return this.home;
    }
}