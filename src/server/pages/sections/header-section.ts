import { JSDOM } from 'jsdom';
import path from 'path';
import { WebpageSection } from './webpage-section.js';
import { GeneratedPage } from '../generated-page.js';
import { WebpageComponent } from '../components/webpage-component.js';
import { WebpageElement } from '../../elements/webpage-element.js';
import { Stylesheet } from '../../elements/stylesheet.js';

export class HeaderSection extends WebpageSection {
    projectPage: GeneratedPage;
    backgroundImage: string;
    backgroundPosition: string;
    backgroundTint: string;

    async setupComponent(parentComponent: WebpageComponent | null, projectPage: GeneratedPage): Promise<void> {
        this.projectPage = projectPage;
    }

    /**
     * Gets the `WebpageElement`s used by the header section.
     * @returns {Iterable<WebpageElement>}
     */
    *getWebpageElements() {
        yield new Stylesheet('/css/header.css');
    }

    setBackgroundImage(url: string, { backgroundPosition = 'top center', backgroundTint = '#00000000' } = {}) {
        this.backgroundImage = url;
        this.backgroundPosition = backgroundPosition;
        this.backgroundTint = backgroundTint;
    }

    /**
     * @param {Document} document
     * @returns {HTMLElement}
     */
    createElement(document: Document) {
        const fragment = JSDOM.fragment(`
            <div class="header">
                <div class="header-title"></div>
                <div class="column-layout">
                    <div class="column-side"></div>
                    <div class="column-center header-description"></div>
                    <div class="column-side"></div>
                </div>
            </div>
        `);

        const resources = this.projectPage.getResources();

        fragment.querySelector('.header-title')!.textContent = resources.getTitle();
        fragment.querySelector('.header-description')!.textContent = resources.getSubtitle();

        const header = fragment.querySelector('.header') as HTMLDivElement;

        if (this.backgroundImage) {
            const imageUrl = resources.getAssetURL(this.backgroundImage);
            header.style.backgroundImage = `url(${imageUrl})`;
            header.classList.add('header-with-image');
            
            header.style.backgroundSize = 'cover';
            header.style.backgroundPosition = this.backgroundPosition;
            header.style.backgroundBlendMode = 'lighten';
            header.style.backgroundColor = this.backgroundTint || 'transparent';
        }

        return header;
    }
}