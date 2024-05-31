import fs from "fs/promises";
import path from "path";
import { ProjectCollection } from "../project/project-collection.js";

let collection: ProjectCollection;

export function getProjectIds() {
    return collection.getEntries().keys();
}

export function getPageContent(projectId: string) {
    const project = collection.getEntries().get(projectId);

    if (!project) {
        return null;
    }

    return project.getContent();
}

export async function setPageContent(projectId: string, content: { [key: string]: string }) {
    const project = collection.getEntries().get(projectId);

    if (!project) {
        return;
    }

    await project.writeContent(content);
    await project.clearCache();
}

export function setupInterface(projectCollection: ProjectCollection) {
    if (collection) {
        throw new Error('Interface already set up');
    }

    collection = projectCollection;
}

export function validateContent(content: { [key: string]: string }) {
    if (typeof content != 'object' || Array.isArray(content)) {
        throw new Error("Root of content.json must be an object");
    }

    for (let key in content) {
        if (typeof content[key] != 'string') {
            throw new Error("Key value pairs in content.json must be of strings");
        }
    }
}