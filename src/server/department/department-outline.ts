import { PageResources } from "../pages/page-resources.js";
import fs from "fs/promises";
import path from "path";
import { ProjectOutline } from "../project/project-outline.js";

export class DepartmentOutline implements PageResources {
    private title: string;
    private subtitle: string;
    private id: string;
    private content: { [key: string]: string; };

    constructor() {
    }

    getFilePath(): string {
        return path.join(process.cwd(), 'content', 'departments', this.id);
    }

    getScriptPath(): string {
        return path.join(process.cwd(), 'dist', 'departments', this.id + '.js');
    }

    getAssetURL(path: string): string {
        return `/assets/department/${this.id}/${path}`;
    }

    getTitle(): string {
        return this.title;
    }

    getSubtitle(): string {
        return this.subtitle;
    }

    getPageContent(): { [key: string]: string; } {
        return this.content;
    }

    setPageContent(content: { [key: string]: string; }): void {
        ProjectOutline

        this.content = content;
    }

    getPageTitle() {
        return this.getTitle() + " | Timeframe";
    }

    static async load(id: string): Promise<DepartmentOutline | null> {
        const outline = new DepartmentOutline();

        outline.id = id;

        let content: { [key: string]: string; };

        try {
            content = JSON.parse(await fs.readFile(path.join(outline.getFilePath(), 'content.json'), 'utf8'));
        } catch (err) {
            console.warn(`\nFailed to load page content for ${id}: ${err}`);

            content = {};
        }

        outline.content = content;

        let outlineData: { title: string, subtitle: string };

        try {
            outlineData = JSON.parse(await fs.readFile(path.join(outline.getFilePath(), 'department.json'), 'utf8'));
        } catch (err) {
            console.warn(`\nFailed to load department outline for ${id}: ${err}`);

            outlineData = { title: id, subtitle: 'Missing department.json' };
        }

        outline.title = outlineData.title;
        outline.subtitle = outlineData.subtitle;

        return outline;        
    }
}