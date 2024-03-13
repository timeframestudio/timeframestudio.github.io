import fs from "fs/promises";
import path, { basename } from "path";
import express from "express";
import { Project } from "./project.js";
import { ProjectOutline } from "./project-outline.js";
import { Department } from "../department/department.js";
import { blankLine, clearLine, rewriteLineWithProgress } from "./rewrite-line.js";

export class PageLoader {
    projects: Map<string, Project> = new Map();
    departments: Map<string, Department>  = new Map();

    async load() {
        let projectFiles = await getSubdirectories('./content/projects');
        let departmentFiles = await getSubdirectories('./content/departments');

        let progress = 0;
        let total = projectFiles.length + departmentFiles.length;

        blankLine();
        rewriteLineWithProgress("Loading webpages", 0, total);

        for (const projectRoot of projectFiles) {
            progress++;

            rewriteLineWithProgress("Loading project: " + projectRoot, progress, total);

            let project: Project;

            try {
                project = new Project(projectRoot);
                await project.setup();
            } catch (err) {
                blankLine();
                console.error(err);

                continue;
            }

            this.projects.set(projectRoot, project);
        }

        for (const departmentRoot of departmentFiles) {
            progress++;

            rewriteLineWithProgress("Loading department: " + departmentRoot, progress, total);

            let department: Department;

            try {
                department = new Department(departmentRoot);
                await department.setup();
            } catch (err) {
                blankLine();
                console.error(err);

                continue;
            }

            this.departments.set(departmentRoot, department);
        }

        clearLine();
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

    getDepartmentPageRouter(): express.RequestHandler {
        const router = express.Router();

        for (let [id, department] of this.departments) {
            router.use(`/${id}`, department.getPageRouter());
        }

        return router;
    }

    getDepartmentAssetRouter(): express.RequestHandler {
        const router = express.Router();

        for (let [id, department] of this.departments) {
            router.use(`/${id}`, department.getAssetRouter());
        }

        return router;
    }

    getOutlineSummaries() {
        let data: ProjectOutline.Summary[] = [];

        for (let [id, project] of this.projects) {
            data.push(ProjectOutline.summarize(id, project.getPageResources()));
        }

        return data;
    }

    getProjects() {
        return this.projects;
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