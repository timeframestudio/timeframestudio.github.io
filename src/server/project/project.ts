import express from "express";
import path from "path";
import { ProjectOutline } from "./project-outline.js";
import { ProjectPageRouter } from "./project-page-router.js";
import process from "process";

export class Project {
    router: express.RequestHandler;

    constructor(private outline: ProjectOutline) {
    }

    async setupProject() {
        const script = this.outline.getScriptPath();

        let router: ProjectPageRouter;

        try {
            const { default: r } = await import(script);

            router = r;
        } catch (err) {
            this.useInternalServerErrorRouter();

            throw new Error(`Failed to load project script: ${script}`);
        }

        try {
            router.bindProjectOutline(this.outline);

            await router.setup();

            this.router = router.getPageRouter();
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