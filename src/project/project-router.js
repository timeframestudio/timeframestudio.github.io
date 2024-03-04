import fs from "fs/promises";
import path, { basename } from "path";
import express from "express";
import { Project } from "./project.js";
import { ProjectOutline } from "./project-outline.js";

export class ProjectRouter {
    /**
     * Project objects loaded from the file system.
     * @type {Map<string, Project>}
     * @private
     */
    projects = new Map();

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

            let projectData;

            try {
                projectData = await fs.readFile('projects/' + projectRoot + '/project.json', 'utf8');
            } catch (err) {
                continue;
            }

            try {
                projectData = JSON.parse(projectData);
            } catch (err) {
                process.stdout.write("\n");
                console.error(err);
                continue;
            }

            let project;

            try {
                project = new Project(ProjectOutline.fromProjectData(projectData, projectRoot));

                await project.setupProject();
            } catch (err) {
                process.stdout.write("\n");
                console.error(err);
                continue;
            }

            this.projects.set(projectRoot, project);
        }

        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
    }

    /**
     * Get the router for the project pages.
     * @returns {express.RequestHandler}
     */
    getProjectPageRouter() {
        const router = express.Router();

        for (let [id, project] of this.projects) {
            router.use(`/${id}`, project.getPageRouter());
        }

        return router;
    }

    /**
     * Get the router for the project assets.
     * @returns {express.RequestHandler}
     */
    getProjectAssetRouter() {
        const router = express.Router();

        for (let [id, project] of this.projects) {
            router.use(`/${id}`, project.getAssetRouter());
        }

        return router;
    }

    /**
     * Get the outline data for the projects.
     * @returns {object}
     */
    getOutlineData() {
        let data = [];

        for (let [id, project] of this.projects) {
            data.push(project.getProjectOutline().getOutlineData());
        }

        return data;
    }
}

/**
 * Read a directory recursively, returning all subdirectories.
 * @param {string} directory
 * @param {string} _basePath
 * @returns {Promise<string[]>}
 */
async function getSubdirectories(directory, _basePath = undefined) {
    _basePath = _basePath ?? directory;

    const files = await fs.readdir(directory, { withFileTypes: true });

    let output = [];

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