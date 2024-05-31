import express from "express";
import { CollectionEntry } from "../collection/collection-entry.js";
import { CachedRouter } from "../pages/cached-router.js";
import fs from "fs/promises";
import path from "path";

export class Department implements CollectionEntry {
    private router: CachedRouter;
    private contentData: { [key: string]: string };

    constructor(private id: string, private path: string, private script: string) {
    }

    getContent(): { [key: string]: string } {
        return this.contentData;
    }

    async setup() {
        let content: { [key: string]: string } = {};
        
        try {
            content = JSON.parse(await fs.readFile(path.join(this.path, 'content.json'), 'utf8'));
        } catch (err) {
        }

        this.contentData = content;

        try {
            const { default: r } = await import(await fs.readFile(this.script, 'utf8'));

            this.router = r;
        } catch (err) {
            throw new Error(`Failed to load project script from ${this.script}. Try restarting \`npm run build\` to build the project scripts.`);
        }
    }

    getStaticFiles(): Map<string, string> {
        return this.router.getStaticFiles();
    }

    getRouteHandler(): express.RequestHandler {
        return this.router.getRouteHandler();
    }

    async clearCache() {
        await this.router.clearCache();
    }

    getPath(): string {
        return this.path;
    }

    getPreviewData() {
    }

    getURL(): string {
        return `/departments/${this.id}`;
    }

    getAssetURL(asset?: string): string {
        if (asset) return `/departments/${this.id}/assets/${asset}`;
        else return `/departments/${this.id}/assets`;
    }
}