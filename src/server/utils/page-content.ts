import { PageLoader } from "../project/page-loader.js";
import fs from "fs/promises";
import path from "path";

let loader: PageLoader;

export function getProjectIds() {
    return loader.getProjects().keys();
}

export function getPageContent(projectId: string) {
    const project = loader.getProjects().get(projectId);

    if (!project) {
        return null;
    }

    return project.getPageResources().getPageContent();
}

export async function setPageContent(projectId: string, content: { [key: string]: string }) {
    const project = loader.getProjects().get(projectId);

    if (!project) {
        return;
    }

    const file = path.join(project.getPageResources().getFilePath(), 'content.json');

    await fs.writeFile(file, JSON.stringify(content, null, 4));

    project.getPageResources().setPageContent(content);

    await project.clearCache();
}

export function setupInterface(pageLoader: PageLoader) {
    if (loader) {
        throw new Error('Interface already set up');
    }

    loader = pageLoader;
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