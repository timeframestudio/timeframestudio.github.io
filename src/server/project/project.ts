import express from "express";
import fs from "fs/promises";
import path from "path";
import { CollectionEntry } from "../collection/collection-entry.js";
import { CachedRouter } from "../pages/cached-router.js";

interface ProjectOutlineData {
    title: string;
    author: string;
    description: string;
    location: [ number, number ];
}

interface ServerSideProjectOutlineData extends ProjectOutlineData {
    unlisted: boolean;
}

interface ClientSideProjectOutlineData extends ProjectOutlineData {
    id: string;
}

export class Project implements CollectionEntry {
    private router: CachedRouter;

    private outlineData: ServerSideProjectOutlineData;
    private contentData: { [key: string]: string };

    constructor(private id: string, private path: string, private script: string) {
    }

    getTitle(): string { return this.outlineData.title; }
    getAuthor(): string { return this.outlineData.author; }
    getSubtitle(): string { return this.outlineData.author; }
    getDescription(): string { return this.outlineData.description; }
    getMapLocation(): [ number, number ] { return this.outlineData.location; }
    getProjectId(): string { return this.id; }
    isUnlisted(): boolean { return this.outlineData.unlisted; }
    getContent(): { [key: string]: string } { return this.contentData; }
    getPath(): string { return this.path; }

    getAssetURL(asset?: string | undefined): string {
        if (asset) {
            if (asset.startsWith('./')) asset = asset.slice(2);

            return `/projects/${this.id}/assets/${asset}`;
        } else return `/projects/${this.id}`;
    }

    async writeContent(content: { [key: string]: string }): Promise<void> {
        this.contentData = content;

        await fs.writeFile(path.join(this.path, 'content.json'), JSON.stringify(content, null, 4));
    }

    async setup() {
        this.outlineData = JSON.parse(await fs.readFile(path.join(this.path, 'project.json'), 'utf8'));

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

    async clearCache() {
        await this.router.clearCache();
    }

    getPreviewData(): ClientSideProjectOutlineData {
        return {
            title: this.outlineData.title,
            author: this.outlineData.author,
            description: this.outlineData.description,
            location: this.outlineData.location,
            id: this.id
        };
    }

    getStaticFiles(): Map<string, string> {
        return this.router.getStaticFiles();
    }

    getRouteHandler(): express.RequestHandler {
        return this.router.getRouteHandler();
    }

    getURL(): string {
        return `/projects/${this.id}`;
    }
}