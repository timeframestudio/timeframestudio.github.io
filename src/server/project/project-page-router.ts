import express from "express";
import { ProjectOutline } from "./project-outline.js";
import { GeneratedPage } from "../pages/generated-page.js";

export class ProjectPageRouter {
    private router: express.RequestHandler;
    private pages: Map<string, GeneratedPage>;

    constructor() {
        this.pages = new Map();
    }

    async addPage(path: string, page: GeneratedPage) {
        this.pages.set(path, page);
    }

    bindProjectOutline(outline: ProjectOutline) {
        for (let [ path, page ] of this.pages) {
            page.bindResources(outline);
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

    getPageRouter(): express.RequestHandler {
        return this.router;
    }
}