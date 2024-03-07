import { ProjectRouter } from "../project/project-router.js";
import fs from "fs/promises";
import path from "path";

export namespace PageContent {
    let router: ProjectRouter;

    export function getProjectIds() {
        return router.getProjects().keys();
    }

    export function getPageContent(projectId: string) {
        const project = router.getProjects().get(projectId);

        if (!project) {
            return null;
        }

        return project.getProjectOutline().getPageContent();
    }

    export async function setPageContent(projectId: string, content: { [key: string]: string }) {
        const project = router.getProjects().get(projectId);

        if (!project) {
            return;
        }

        const file = path.join(project.getProjectOutline().getFilePath(), 'content.json');

        await fs.writeFile(file, JSON.stringify(content, null, 4));

        project.getProjectOutline().setPageContent(content);

        await project.clearCache();
    }
    
    export function setupInterface(projectRouter: ProjectRouter) {
        if (router) {
            throw new Error('Interface already set up');
        }

        router = projectRouter;
    }
}