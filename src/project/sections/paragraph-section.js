import { ProjectSection } from "../project-section.js";
import { JSDOM } from 'jsdom';
import { wrapColumnLayout } from "../wrap-column-layout.js";
import fs from 'fs/promises';
import path from 'path';

export class PargraphSection extends ProjectSection {
    constructor() {
        super();
    }

    async setup(data, project) {
        if (typeof data.file == 'string') {
            let assetPath = path.resolve('./projects/' + project.id + '/', data.file);

            try {
                this.text = await fs.readFile(assetPath, 'utf8');
            } catch (err) {
                console.warn('Failed to read text file for paragraph section');
                console.warn("Trying to read from: " + assetPath);
                console.warn(err);

                return null;
            }
        } else if (typeof data.text == 'string') {
            this.text = data.text;
        } else {
            console.warn('Paragraph section requires a file or text property');

            return null;
        }
    }

    createElement(document, isSubsection) {
        const fragment = JSDOM.fragment(`
            <div class="paragraph-section">
            </div>
        `);

        const target = fragment.querySelector('.paragraph-section');

        target.textContent = this.text || 'No text';

        return wrapColumnLayout(fragment.children[0], document, isSubsection);
    }
}