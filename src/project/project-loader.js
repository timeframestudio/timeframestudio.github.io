import fs from 'fs/promises';
import { Project } from './project.js';
import { HeaderSection } from './header-section.js';
import { JSDOM } from 'jsdom';
import { DescriptionSection } from './description-section.js';

export class ProjectLoader {
    constructor() {
        this.projects = new Map();
        this.summaries = [];
    }

    async setup() {
        const projectTemplate = await fs.readFile('./dist/project.html');

        const projectFiles = await fs.readdir('./projects');

        for (const projectFile of projectFiles) {
            let data;

            try {
                data = await fs.readFile(`./projects/${projectFile}/project.json`);
            } catch (err) {
                console.warn(`Failed to read project file './projects/${projectFile}/projectjson'`);
                continue;
            }

            try {
                data = JSON.parse(data.toString());
            } catch (err) {
                console.warn(`Failed to parse project file './projects/${projectFile}/project.json'`);
                continue;
            }

            const project = await this.loadProject(data, projectFile);

            const jsdom = new JSDOM(projectTemplate);
            const document = jsdom.window.document;
            project.addProjectSections(document);

            this.projects.set(projectFile, jsdom.serialize());

            this.summaries.push(project.getSummary());
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

            let section;
            
            if (sectionData.type == 'header') {
                section = new HeaderSection();
            } else if (sectionData.type == 'description') {
                section = new DescriptionSection();
            } else {
                console.warn(`Unknown section type '${data.type}'`);
                continue;
            }

            section.project = project;
            section.data = sectionData;

            await section.setup();
            project.sections.push(section);
        }

        return project;
    }

    getProjectHTML(id) {
        return this.projects.get(id);
    }

    getProjectSummaries() {
        return this.summaries;
    }
}