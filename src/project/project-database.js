import fs from 'fs/promises';
import { loadSection } from './load-section.js';
import { Project } from './project.js';

/**
 * The `ProjectDatabase` class represents a database of projects, which can be loaded from
 * the file system and accessed by other parts of the application.
 */
export class ProjectDatabase {
    /**
     * The singleton instance of the `ProjectDatabase` class.
     */
    static instance = null;

    /**
     * Creates a new `ProjectDatabase` instance.
     */
    constructor() {
        this.projects = new Map();
        this.summaries = [];

        ProjectDatabase.instance = this;
    }

    /**
     * Sets up the project database by loading the projects from the file system.
     */
    async setup() {
        const projectIds = await fs.readdir('./projects');

        this.projects = new Map();

        for (const id of projectIds) {
            let data;

            try {
                data = await fs.readFile(`./projects/${id}/project.json`);
            } catch (err) {
                console.warn(`Failed to read project file './projects/${id}/projectjson'`);
                continue;
            }

            try {
                data = JSON.parse(data.toString());
            } catch (err) {
                console.warn(`Failed to parse project file './projects/${id}/project.json'`);
                continue;
            }

            const project = await this.loadProject(data, id);

            this.summaries.push(project.getSummary());

            this.projects.set(id, project);
        }
    }

    async loadProject(data, id) {
        if (!data.title) {
            console.warn('Project title is required');
            return;
        }

        if (!data.author) {
            console.warn('Project author is required');
            return;
        }

        if (!data.description) {
            console.warn('Project description is required');
            return;
        }

        if (!Array.isArray(data.sections)) {
            console.warn('Project sections is required and must be an array');
            return;
        }

        const project = new Project();

        project.title = data.title;
        project.author = data.author;
        project.description = data.description;
        project.id = id;
        project.position = data.position;

        for (const sectionData of data.sections) {
            if (typeof sectionData != 'object') {
                console.warn('Project section must be an object');
                continue;
            }

            if (!sectionData.type) {
                console.warn('Project section type is required');
                continue;
            }

            const section = await loadSection(sectionData, project);

            if (section) project.sections.push(section);
        }

        return project;
    }
    
    /**
     * Gets the projects in the database.
     * @returns {Map<string, Project>} The projects in the database.
     */
    getProjects() {
        return this.projects;
    }

    /**
     * Gets a project from the database by its ID.
     * @param {string} id The ID of the project to get.
     * @returns {Project} The project with the given ID, or `undefined` if no project is found.
     */
    getProject(id) {
        return this.projects.get(id);
    }

    /**
     * Gets the project summaries in the database.
     * @returns {Object[]} The project summaries in the database.
     */
    getProjectSummaries() {
        return this.summaries;
    }
}