import { JSDOM } from 'jsdom';
import { StandardLayout } from '../elements/standard-layout.js';
import { loadSection } from './load-section.js';
import { Project } from './project.js';
import { ProjectSummaries } from '../elements/project-summaries.js';
import { ProjectDatabase } from './project-database.js';

/**
 * The `ProjectLoader` class is responsible for generating the HTML for each project,
 * loaded by the `ProjectDatabase` class.
 */
export class ProjectLoader {
    /**
     * Creates a new `ProjectLoader` instance.
     */
    constructor() {
        this.generatedProjects = new Map();
    }

    /**
     * Sets up the project loader by generating the HTML for each project.
     */
    async setup() {
        for (const [ id, project ] of ProjectDatabase.instance.getProjects()) {
            const jsdom = new JSDOM();
            const document = jsdom.window.document;

            project.addProjectSections(document);
            
            const summaries = new ProjectSummaries();
            summaries.add(document);

            const layout = new StandardLayout();
            layout.add(document);

            this.generatedProjects.set(id, jsdom.serialize());

            jsdom.window.close();
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
     * Get the HTML for a project by its ID.
     */
    getProjectHTML(id) {
        return this.generatedProjects.get(id);
    }
}