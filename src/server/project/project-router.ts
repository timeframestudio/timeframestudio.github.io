import fs from "fs/promises";
import path, { basename } from "path";
import express from "express";
import { Project } from "./project.js";
import { ProjectOutline } from "./project-outline.js";

export class ProjectRouter {
    projects: Map<string, Project> = new Map();

    async loadProjects() {
        let projectFiles = await getSubdirectories('./projects');

        process.stdout.write("Loading projects".padEnd(64, " ") + " 0%");

        let progress = 0;
        let total = projectFiles.length;

        for (const projectRoot of projectFiles) {
            let precent = Math.round(progress / total * 100).toString().padStart(2, " ");
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write(("Loading project: " + projectRoot).padEnd(64, " ") + precent + "%");

            progress++;

            let outlineText: string | ProjectOutline;

            try {
                outlineText = await fs.readFile('projects/' + projectRoot + '/project.json', 'utf8');
            } catch (err) {
                process.stdout.write(`\nFailed to read project.json`);

                continue;
            }

            let projectData: ProjectOutline.OutlineData;

            try {
                projectData = JSON.parse(outlineText);
            } catch (err) {
                process.stdout.write(`\nFailed to parse project.json`);
                continue;
            }

            let project: Project;

            try {
                project = new Project(ProjectOutline.fromProjectData(projectData, projectRoot));
                await project.setupProject();
            } catch (err) {
                process.stdout.write(`\n`);
                console.error(err);
                continue;
            }

            this.projects.set(projectRoot, project);
        }

        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
    }

    getProjectPageRouter(): express.RequestHandler {
        const router = express.Router();

        for (let [id, project] of this.projects) {
            router.use(`/${id}`, project.getPageRouter());
        }

        return router;
    }

    getProjectAssetRouter(): express.RequestHandler {
        const router = express.Router();

        for (let [id, project] of this.projects) {
            router.use(`/${id}`, project.getAssetRouter());
        }

        return router;
    }

    getOutlineSummaries() {
        let data: ProjectOutline.Summary[] = [];

        for (let [id, project] of this.projects) {
            data.push(project.getProjectOutline().getOutlineData());
        }

        return data;
    }
}

async function getSubdirectories(directory: string, _basePath?: string): Promise<string[]> {
    _basePath = _basePath ?? directory;

    const files = await fs.readdir(directory, { withFileTypes: true });

    let output: string[] = [];

    for (const file of files) {
        if (file.isDirectory()) {
            let subpath = path.join(directory, file.name);
            let subfiles = await getSubdirectories(subpath, _basePath);

            output.push(...subfiles);
            output.push(path.relative(_basePath, subpath));
        }
    }

    return output;
}