import { Webpage } from "./webpage.js";
import express from "express";

export abstract class CachedWebpage implements Webpage {
    private cache?: string;

    async setupWebpage() {
        this.cache = await this.generateWebpage();
    }

    getPageHTML() {
        return this.cache!;
    }

    async clearCache() {
        await this.setupWebpage();
    }

    getRouteHandler() {
        return (req: express.Request, res: express.Response) => {
            res.send(this.cache);
        };
    }

    abstract generateWebpage(): Promise<string>;
}