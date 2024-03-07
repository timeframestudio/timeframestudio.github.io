import express from "express";
import path from "path";
import { ProjectOutline } from "./project-outline.js";
import { ProjectPageRouter } from "./project-page-router.js";
import fs from "fs/promises";

export class Project {
    private router: express.RequestHandler;
    private pageRouter: ProjectPageRouter;

    constructor(private outline: ProjectOutline) {
    }

    async setupProject() {
        let content: { [key: string]: string } = {};
        
        try {
            content = JSON.parse(await fs.readFile(path.join(this.outline.getFilePath(), 'content.json'), 'utf8'));
        } catch (err) {
        }

        ProjectOutline.addPageContent(this.outline, content);

        const script = this.outline.getScriptPath();

        try {
            const { default: r } = await import(script);

            this.pageRouter = r;
        } catch (err) {
            this.useInternalServerErrorRouter();

            throw new Error(`Failed to load project script: ${script}`);
        }

        try {
            this.pageRouter.bindProjectOutline(this.outline);

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

    getPageRouter(): express.RequestHandler {
        return this.router;
    }

    getAssetRouter(): express.RequestHandler {
        return express.static(path.join(this.outline.getFilePath(), 'assets'));
    }

    getProjectOutline(): ProjectOutline {
        return this.outline;
    }
}