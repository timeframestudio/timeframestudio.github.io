import { ProjectSection } from "./project-section.js";
import { JSDOM } from 'jsdom';
import { wrapColumnLayout } from "./wrap-column-layout.js";
import path from 'path';

export class ImageSection extends ProjectSection {
    constructor() {
        super();
    }

    async setup(data, project) {
        this.project = project;
        this.loadFromData(data);
    }

    loadFromData(data) {
        if (typeof data.url != 'string') {
            console.warn('Image URL is required and must be a string');
            return;
        }

        if (data.dimensions && typeof data.dimensions != 'object') {
            console.warn('Image dimensions must be an object if present');
            return;
        }

        if (data.dimensions && (typeof data.dimensions.width != 'number' || typeof data.dimensions.height != 'number')) {
            console.warn('Image dimensions must have width and height properties that are numbers');
            return;
        }

        if (data.caption && typeof data.caption != 'string') {
            console.warn('Image caption must be a string if present');
            return;
        }

        if (data.alt && typeof data.alt != 'string') {
            console.warn('Image alt text must be a string if present');
            return;
        }

        this.image = data;
    }

    *getStylesheets() {
        yield '/css/image.css';
    }

    createElement(document, isSubsection) {
        const fragment = JSDOM.fragment(`
            <div class="image-section">
                <div class="image-section-centered-wrapper">
                    <img class="image-section-image"></img>
                </div>
            </div>
        `);

        const image = fragment.querySelector('.image-section-image');
        image.src = path.resolve('/assets/project/' + this.project.id + '/', this.image.url);

        if (this.image.alt) image.alt = this.image.alt || '';
        if (this.image.dimensions) {
            image.width = this.image.dimensions.width;
            image.height = this.image.dimensions.height;
        }

        if (this.image.caption) {
            const caption = document.createElement('div');
            caption.textContent = this.image.caption;
            caption.classList.add('image-section-caption');

            fragment.querySelector('.image-section-centered-wrapper').appendChild(caption);
        }

        return wrapColumnLayout(fragment.children[0], document, isSubsection);
    }
}