import { HeaderSection } from "./header-section.js";

export class Project {
    title = 'Project Title';
    author = 'Project Author';
    description = 'Project Description';
    sections = [];

    addProjectSections(document) {
        document.title = this.title + " | Khan Lab Studios";

        let stylesheets = new Set([
            '/css/main.css'
        ]);

        let scripts = new Set([
            '/scripts/navigation.js'
        ]);

        for (const section of this.sections) {
            const sectionElement = section.createElement(document);

            if (sectionElement) document.body.appendChild(sectionElement);

            for (const stylesheet of section.getStylesheets()) {
                stylesheets.add(stylesheet);
            }

            for (const script of section.getScripts()) {
                scripts.add(script);
            }
        }

        for (const stylesheet of stylesheets) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = stylesheet;

            document.head.appendChild(link);
        }

        for (const script of scripts) {
            const scriptElement = document.createElement('script');
            scriptElement.src = script;
            scriptElement.type = 'module';

            document.body.appendChild(scriptElement);
        }
    }
}