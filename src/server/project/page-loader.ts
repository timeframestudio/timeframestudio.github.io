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
        let projectFiles = await getDirectSubdirectories('./content/projects');
        let departmentFiles = await getDirectSubdirectories('./content/departments');

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
            router.use(`/${id}`, project.getPageRequestHandler());
        }

        return router;
    }

    getProjectAssetRouter(): express.RequestHandler {
        const router = express.Router();

        for (let [id, project] of this.projects) {
            router.use(`/${id}`, project.getAssetRequestHandler());
        }

        return router;
    }

    getDepartmentPageRouter(): express.RequestHandler {
        const router = express.Router();

        for (let [id, department] of this.departments) {
            router.use(`/${id}`, department.getPageRequestHandler());
        }

        return router;
    }

    getDepartmentAssetRouter(): express.RequestHandler {
        const router = express.Router();

        for (let [id, department] of this.departments) {
            router.use(`/${id}`, department.getAssetRequestHandler());
        }

        return router;
    }

    getOutlineSummaries() {
        let data: ProjectOutline.Summary[] = [];

        for (let [id, project] of this.projects) {
            const summary = ProjectOutline.summarize(id, project.getPageResources());

            if (summary) data.push(summary);
        }

        return data;
    }

    getProjects() {
        return this.projects;
    }

    getDepartments() {
        return this.departments;
    }
}

async function getDirectSubdirectories(directory: string): Promise<string[]> {
    const files = await fs.readdir(directory, { withFileTypes: true });

    let output: string[] = [];

    for (const file of files) {
        if (file.isDirectory()) {
            output.push(file.name);
        }
    }

    return output;
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