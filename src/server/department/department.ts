import express from "express";
import path from "path";
import { PageRouter } from "../pages/page-router.js";
import { DepartmentOutline } from "./department-outline.js";
import { PageResources } from "../pages/page-resources.js";

export class Department {
    private requestHandler: express.RequestHandler;
    private router: PageRouter;
    private outline: DepartmentOutline;

    constructor(private id: string) {
    }

    async setup() {
        const outline = await DepartmentOutline.load(this.id);

        if (!outline) {
            return;
        }

        this.outline = outline;

        const script = this.outline.getScriptPath();

        try {
            const { default: r } = await import(script);

            this.router = r;
        } catch (err) {
            this.useInternalServerErrorRouter();

            throw new Error(`Failed to load page script: ${path.relative(process.cwd(), script)}`);
        }

        try {
            this.router.bindResources(this.outline);

            await this.router.setup();

            this.requestHandler = this.router.getPageRouter();
        } catch (err) {
            this.useInternalServerErrorRouter();

            throw err;
        }
    }

    private useInternalServerErrorRouter() {
        this.requestHandler = (req, res) => {
            res.status(500).send("Error 500: Internal server error");
        };
    }

    async clearCache() {
        await this.router.clearCache();
    }

    getPageRequestHandler(): express.RequestHandler {
        return this.requestHandler;
    }

    getAssetRequestHandler(): express.RequestHandler {
        return express.static(path.join(this.outline.getFilePath(), 'assets'));
    }

    getPageRouter(): PageRouter {
        return this.router;
    }

    getPageResources(): DepartmentOutline {
        return this.outline;
    }
}