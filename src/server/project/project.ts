import express from "express";
import path from "path";
import { ProjectOutline } from "./project-outline.js";
import { PageRouter } from "../pages/page-router.js";
import fs from "fs/promises";
import { PageResources } from "../pages/page-resources.js";

export class Project {
    private router: express.RequestHandler;
    private pageRouter: PageRouter;
    private outline: ProjectOutline;

    constructor(private id: string) {
    }

    async setup() {
        const outline = await ProjectOutline.load(this.id);

        if (!outline) {
            return;
        }

        this.outline = outline;

        let content: { [key: string]: string } = {};
        
        try {
            content = JSON.parse(await fs.readFile(path.join(this.outline.getFilePath(), 'content.json'), 'utf8'));
        } catch (err) {
        }

        this.outline.setPageContent(content);

        const script = this.outline.getScriptPath();

        try {
            const { default: r } = await import(script);

            this.pageRouter = r;
        } catch (err) {
            this.useInternalServerErrorRouter();

            throw new Error(`Failed to load project script: ${path.relative(process.cwd(), script)}. Try restarting \`npm run build\` to build the project scripts.`);
        }

        try {
            this.pageRouter.bindResources(this.outline);

            await this.pageRouter.setup();

            this.router = this.pageRouter.getPageRouter();
        } catch (err) {
            this.useInternalServerErrorRouter();

            throw err;
        }
    }

    private useInternalServerErrorRouter() {
        this.router = (req, res) => {
            res.status(500).send("Error 500: Internal server error");
        };
    }

    async clearCache() {
        await this.pageRouter.clearCache();
    }

    getPageRequestHandler(): express.RequestHandler {
        return this.router;
    }

    getPageRouter(): PageRouter {
        return this.pageRouter;
    }

    getAssetRequestHandler(): express.RequestHandler {
        return express.static(path.join(this.outline.getFilePath(), 'assets'));
    }

    getPageResources(): ProjectOutline {
        return this.outline;
    }
}