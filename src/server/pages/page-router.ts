import express from "express";
import { GeneratedPage } from "./generated-page.js";
import { PageResources } from "./page-resources.js";

export class PageRouter {
    private router: express.RequestHandler;
    private pages: Map<string, GeneratedPage>;

    constructor() {
        this.pages = new Map();
    }

    async addPage(path: string, page: GeneratedPage) {
        this.pages.set(path, page);
    }

    bindResources(resources: PageResources) {
        for (let [ path, page ] of this.pages) {
            page.bindResources(resources);
        }
    }

    async clearCache() {
        for (let [ path, page ] of this.pages) {
            await page.clearCache();
        }
    }

    async setup() {
        let router = express.Router();

        for (let [ routePath, page ] of this.pages) {
            await page.setupWebpage();

            router.get(routePath, page.getRouteHandler());
        }

        this.router = router;
    }

    getPages(): Map<string, GeneratedPage> {
        return this.pages;
    }

    getPageRouter(): express.RequestHandler {
        return this.router;
    }
}