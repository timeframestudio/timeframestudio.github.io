import { RequestHandler } from "express";
import fs from "fs/promises";
import { Router } from "../website/router.js";
import { CollectionEntry } from "./collection-entry.js";
import path from "path";
import * as express from "express";

export abstract class Collection<E extends CollectionEntry = CollectionEntry> implements Router {
    private pages: Map<string, E>;

    constructor(private path: string, private scriptsPath: string) {
    }

    protected abstract loadEntry(id: string, path: string, scriptPath: string): Promise<E>;

    async setup(): Promise<void> {
        this.pages = new Map();

        const ids = await fs.readdir(this.path);

        let index = 0;

        for (const id of ids) {
            console.log(`Loading '${id}' (${++index}/${ids.length})`);

            this.pages.set(id, await this.loadEntry(id, path.join(this.path, id), path.join(this.scriptsPath, id + '.js')));
        }
    }

    getStaticFiles(): Map<string, string> {
        const files = new Map();

        for (const [ id, page ] of this.pages) {
            for (const [ subpath, content ] of page.getStaticFiles()) {
                files.set(path.join(id, subpath), content);
            }
        }

        return files;
    }

    getRouteHandler(): RequestHandler {
        const router = express.Router();

        for (const [ id, page ] of this.pages) {
            router.use(`/${id}`, page.getRouteHandler());
        }

        return router;
    }

    getPreviewData(): { id: string }[] {
        const data: { id: string }[] = [];

        for (const [ id, page ] of this.pages) {
            data.push({ id, ...page.getPreviewData() });
        }

        return data;
    }

    getEntries(): Map<string, E> {
        return new Map(this.pages);
    }
}