import { ProjectPage } from "../project-page.js";
import { WebpageComponent } from "../components/webpage-component.js";
import { WebpageSection } from "../webpage-section.js";
import { WebpageElement } from "../../elements/webpage-element.js";
import { Stylesheet } from "../../elements/stylesheet.js";

export class PaddedSection extends WebpageSection {
    private components: WebpageComponent[];

    constructor(...components: WebpageComponent[]) {
        super();
        
        this.components = components;
    }

    async setupComponent(parentComponent: WebpageComponent | null, projectPage: ProjectPage) {
        for (let component of this.components) {
            await component.setupComponent(this, projectPage);
        }
    }

    *getWebpageElements() {
        yield new Stylesheet('/css/padded.css');
    }

    createElement(document: Document) {
        const columnLayout = document.createElement('div');
        columnLayout.classList.add('column-layout');

        const sectionTheme = this.getSectionTheme();
        columnLayout.style.backgroundColor = sectionTheme.getBackgroundColor();
        columnLayout.style.color = sectionTheme.getTextColor();

        const columnSide1 = document.createElement('div');
        columnSide1.classList.add('column-side');
        columnLayout.appendChild(columnSide1);

        const columnCenter = document.createElement('div');
        columnCenter.classList.add('column-center');

        for (let component of this.components) {
            const element = component.createElement(document);

            if (element) {
                columnCenter.appendChild(element);
            }
        }

        columnLayout.appendChild(columnCenter);

        const columnSide2 = document.createElement('div');
        columnSide2.classList.add('column-side');
        columnLayout.appendChild(columnSide2);

        return columnLayout;
    }
}