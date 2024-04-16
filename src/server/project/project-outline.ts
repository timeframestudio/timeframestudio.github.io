import path from "path";
import process from "process";
import { PageResources } from "../pages/page-resources.js";
import { validateContent } from "../utils/page-content.js";
import fs from "fs/promises";

export class ProjectOutline implements PageResources {
    private title: string;
    private author: string;
    private description: string;
    private projectId: string;
    private mapLocation: [ number, number ];
    private content: { [key: string]: string };
    private example: boolean;

    getTitle() {
        return this.title;
    }

    isExample() {
        return this.example;
    }

    getSubtitle() {
        return this.author;
    }

    getAuthor() {
        return this.author;
    }

    getDescription() {
        return this.description
    }

    getProjectId() {
        return this.projectId;
    }

    getMapLocation() {
        return this.mapLocation;
    }
    
    getAssetURL(asset: string): string {
        return path.join(`/assets/project/${this.getProjectId()}/`, asset);
    }

    getFilePath(): string {
        return path.join(process.cwd(), 'content', 'projects', this.getProjectId());
    }

    getScriptPath(): string {
        return path.join(process.cwd(), 'dist', 'projects', this.getProjectId() + '.js');
    }

    getOutlineData(): ProjectOutline.Summary {
        return {
            title: this.getTitle(),
            author: this.getAuthor(),
            description: this.getDescription(),
            id: this.getProjectId(),
            location: this.getMapLocation()
        };
    }

    getContent(key: string): string {
        return this.content[key].replace(/\$title/g, this.title).replace(/\$author/g, this.author);
    }
    
    getPageContent() {
        return this.content;
    }

    setPageContent(content: { [key: string]: string }) {
        validateContent(content);

        this.content = content;
    }

    getPageTitle() {
        return this.getTitle() + " | Timeframe";
    }

    static fromProjectData(outlineData: ProjectOutline.OutlineData, id: string) {
        ProjectOutline.validateProjectData(outlineData);

        let outline = new ProjectOutline();

        outline.title = outlineData.title;
        outline.author = outlineData.author;
        outline.description = outlineData.description;
        outline.mapLocation = outlineData.location;
        outline.example = outlineData.example === true;

        outline.projectId = id;

        return outline;
    }

    private static validateProjectData(outlineData: ProjectOutline.OutlineData) {
        if (!outlineData.title) throw new Error("Project outline does not have a title.");
        if (typeof outlineData.title !== "string") throw new Error("Project outline title is not a string.");
        if (!outlineData.author) throw new Error("Project outline does not have an author.");
        if (typeof outlineData.author !== "string") throw new Error("Project outline author is not a string.");
        if (!outlineData.description) throw new Error("Project outline does not have a description.");
        if (typeof outlineData.description !== "string") throw new Error("Project outline description is not a string.");
        if (!outlineData.location) throw new Error("Project outline does not have a location.");
        if (!Array.isArray(outlineData.location)) throw new Error("Project outline location is not an array.");
        if (outlineData.location.length !== 2) throw new Error("Project outline location does not have two elements.");
        if (typeof outlineData.location[0] !== "number") throw new Error("Project outline location x is not a number.");
        if (typeof outlineData.location[1] !== "number") throw new Error("Project outline location y is not a number.");
    }

    static summarize(id: string, outline: ProjectOutline): ProjectOutline.Summary | null {
        if (outline.isExample()) return null;

        return {
            title: outline.getTitle(),
            author: outline.getAuthor(),
            description: outline.getDescription(),
            id: id,
            location: outline.getMapLocation()
        };
    }

    static async load(id: string): Promise<ProjectOutline | null> {
        const outline = new ProjectOutline();

        outline.projectId = id;

        let content: { [key: string]: string; };

        try {
            content = JSON.parse(await fs.readFile(path.join(outline.getFilePath(), 'content.json'), 'utf8'));
        } catch (err) {
            content = {};
        }

        outline.content = content;

        let outlineData: ProjectOutline.OutlineData;

        try {
            outlineData = JSON.parse(await fs.readFile(path.join(outline.getFilePath(), 'project.json'), 'utf8'));
        } catch (err) {
            outlineData = { title: id, author: 'Web Dev', description: 'Missing project.json', location: [ 2560 / 2, 1424 / 2 ] };
        }

        outline.title = outlineData.title;
        outline.author = outlineData.author;
        outline.description = outlineData.description;
        outline.mapLocation = outlineData.location;
        outline.example = outlineData.example === true;

        return outline;        
    }
}

export namespace ProjectOutline {
    interface ProjectOutlineData {
        title: string;
        author: string;
        description: string;
        location: [ number, number ];
    }

    interface Example {
        example?: boolean;
    }

    interface Id {
        id: string;
    }

    export type Summary = ProjectOutlineData & Id;
    export type OutlineData = ProjectOutlineData & Example;
}