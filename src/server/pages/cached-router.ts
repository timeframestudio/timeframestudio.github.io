import express from "express";
import { Router } from "../website/router.js";
import { GeneratedPage } from "./generated-page.js";

export class CachedRouter implements Router {
    private requestHandler: express.RequestHandler;
    private pages: Map<string, GeneratedPage>;
    private staticFiles: Map<string, string>;

    constructor() {
        this.pages = new Map();
    }

    async addPage(path: string, page: GeneratedPage) {
        this.pages.set(path, page);
    }

    async clearCache() {
        for (let [ path, page ] of this.pages) {
            await page.clearCache();
        }
    }

    async setup() {
        let router = express.Router();
        let staticFiles = new Map<string, string>();

        for (let [ routePath, page ] of this.pages) {
            await page.setupWebpage();

            router.get(routePath, page.getRouteHandler());
            staticFiles.set(routePath, page.getPageHTML());
        }

        this.requestHandler = router;
        this.staticFiles = staticFiles;
    }

    getStaticFiles(): Map<string, string> {
        return this.staticFiles;
    }

    getRouteHandler(): express.RequestHandler {
        return this.requestHandler;
    }
}