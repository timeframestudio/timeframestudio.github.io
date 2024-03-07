import path from "path";
import process from "process";

export class ProjectOutline {
    private title: string;
    private author: string;
    private description: string;
    private projectId: string;
    private mapLocation: [ number, number ];
    private content: { [key: string]: string };

    getTitle() {
        return this.title;
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
    
    getAssetURL(): string {
        return `/assets/project/${this.getProjectId()}/`;
    }

    getFilePath(): string {
        return path.join(process.cwd(), 'projects', this.getProjectId());
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
    
    getPageContent() {
        return this.content;
    }

    setPageContent(content: { [key: string]: string }) {
        ProjectOutline.validateContent(content);

        this.content = content;
    }

    private static validateContent(content: { [key: string]: string }) {
        if (typeof content != 'object' || Array.isArray(content)) {
            throw new Error("Root of content.json must be an object");
        }

        for (let key in content) {
            if (typeof content[key] != 'string') {
                throw new Error("Key value pairs in content.json must be of strings");
            }
        }
    }

    static addPageContent(outline: ProjectOutline, content: { [key: string]: string }) {
        if (outline.content) throw new Error("Project outline already has page content.");

        ProjectOutline.validateContent(content);

        outline.content = content;
    }

    static fromProjectData(outlineData: ProjectOutline.OutlineData, id: string) {
        ProjectOutline.validateProjectData(outlineData);

        let outline = new ProjectOutline();

        outline.title = outlineData.title;
        outline.author = outlineData.author;
        outline.description = outlineData.description;
        outline.mapLocation = outlineData.location;

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
}

export namespace ProjectOutline {
    interface ProjectOutlineData {
        title: string;
        author: string;
        description: string;
        location: [ number, number ];
    }

    interface Id {
        id: string;
    }

    export type Summary = ProjectOutlineData & Id;
    export type OutlineData = ProjectOutlineData;
}