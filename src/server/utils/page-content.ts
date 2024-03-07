import { ProjectRouter } from "../project/project-router.js";
import fs from "fs/promises";
import path from "path";

export class PageContent {
    private static instance: PageContent;

    private constructor(private router: ProjectRouter) {
    }

    getProjectIds() {
        return this.router.getProjects().keys();
    }

    getPageContent(projectId: string) {
        const project = this.router.getProjects().get(projectId);

        if (!project) {
            return null;
        }

        return project.getProjectOutline().getPageContent();
    }

    async setPageContent(projectId: string, content: { [key: string]: string }) {
        const project = this.router.getProjects().get(projectId);

        if (!project) {
            return;
        }

        const file = path.join(project.getProjectOutline().getFilePath(), 'content.json');

        await fs.writeFile(file, JSON.stringify(content, null, 4));

        project.getProjectOutline().setPageContent(content);

        await project.clearCache();
    }
    
    static getInterface() {
        return this.instance;
    }

    static setupInterface(router: ProjectRouter) {
        if (!this.instance) {
            this.instance = new PageContent(router);
        }
    }
}