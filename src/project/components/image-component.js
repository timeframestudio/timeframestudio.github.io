import { JSDOM } from 'jsdom';
import path from 'path';
import { WebpageComponent } from './webpage-component.js';
import { Stylesheet } from '../../elements/stylesheet.js';
import { ProjectPage } from '../project-page.js';
import { WebpageElement } from '../../elements/webpage-element.js';

export class ImageComponent extends WebpageComponent {
    /**
     * The image url for this component.
     * @private
     * @type {string}
     * @readonly
     */
    url;

    /**
     * The image dimensions for this component.
     * @private
     * @type {{ width: number, height: number } | null}
     * @readonly
     */
    dimensions;

    /**
     * The image caption for this component.
     * @private
     * @type {string | null}
     * @readonly
     */
    caption;

    /**
     * The image alt text for this component.
     * @private
     * @type {string | null}
     * @readonly
     */
    alt;

    /**
     * The project page this component is in.
     * @type {ProjectPage}
     * @private
     */
    projectPage = null;

    /**
     * Create a new `ImageComponent`.
     * @param {string} url The URL of the image.
     * @param {object} options
     * @param {{ width: number, height: number }} [options.dimensions] The dimensions of the image.
     * @param {string} [options.caption] The caption for the image.
     * @param {string} [options.alt] The alt text for the image.
     */
    constructor(url, { dimensions, caption, alt } = {}) {
        super();

        this.url = url;
        this.dimensions = dimensions ?? null;
        this.caption = caption ?? null;
        this.alt = alt ?? null;
    }

    /**
     * Gets the `WebpageElement`s used by the image component.
     * @returns {Iterable<WebpageElement>}
     */
    *getWebpageElements() {
        yield new Stylesheet({ url: '/css/image.css' });
    }

    /**
     * Sets up the image component.
     * @param {WebpageComponent | null} parentComponent
     * @param {ProjectPage} projectPage
     */
    async setupComponent(parentComponent, projectPage) {
        this.projectPage = projectPage;
    }

    /**
     * Create an element for the image component.
     * @param {Document} document
     */
    createElement(document) {
        const fragment = JSDOM.fragment(`
            <div class="image-component">
                <div class="image-component-column">
                    <img class="image-component-image"></img>
                </div>
            </div>
        `);

        const projectOutline = this.projectPage.getProjectOutline();

        /** @type {HTMLImageElement} */
        const image = fragment.querySelector('.image-component-image');
        image.src = path.resolve(projectOutline.getAssetURL(), this.url);

        if (this.alt) image.alt = this.alt || '';
        if (this.dimensions) {
            image.width = this.dimensions.width;
            image.height = this.dimensions.height;
        }

        if (this.caption) {
            const caption = document.createElement('div');
            caption.textContent = this.caption;
            caption.classList.add('image-component-caption');

            fragment.querySelector('.image-component-column').appendChild(caption);
        }

        /** @type {HTMLDivElement} */
        const imageComponent = fragment.querySelector('.image-component');

        return imageComponent;
    }
}