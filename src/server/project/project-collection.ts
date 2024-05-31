import { Project } from "./project.js";
import { CollectionEntry } from "../collection/collection-entry.js";
import { Collection } from "../collection/collection.js";

export class ProjectCollection extends Collection<Project> {
    protected async loadEntry(id: string, path: string, script: string): Promise<Project> {
        const project = new Project(id, path, script);
        await project.setup();

        return project;
    }

    async loadProjects() {
        
    }
}