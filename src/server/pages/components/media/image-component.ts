import { JSDOM } from 'jsdom';
import path from 'path';
import { Stylesheet } from '../../../elements/stylesheet.js';
import { GeneratedPage } from '../../generated-page.js';
import { BaseWebpageComponent } from '../base-webpage-component.js';
import { WebpageComponent } from '../webpage-component.js';

interface ImageComponentOptions {
    dimensions?: { width: number, height: number };
    caption?: string;
    alt?: string;
}

export class ImageComponent extends BaseWebpageComponent {
    private url: string;
    private dimensions: { width: number, height: number } | null;
    private caption: string | null;
    private alt: string | null;
    private projectPage?: GeneratedPage;

    constructor(url: string, { dimensions, caption, alt }: Partial<ImageComponentOptions> = {}) {
        super();
        
        this.url = url;
        this.dimensions = dimensions ?? null;
        this.caption = caption ?? null;
        this.alt = alt ?? null;
    }

    *getWebpageElements() {
        yield new Stylesheet('/css/image.css');
    }

    async setupComponent(parentComponent: WebpageComponent, projectPage: GeneratedPage): Promise<void> {
        this.projectPage = projectPage;
    }

    createElement(document: Document) {
        if (!this.projectPage) throw new Error('The image component has not been set up.');

        const fragment = JSDOM.fragment(`
            <div class="image-component">
                <div class="image-component-column">
                    <img class="image-component-image"></img>
                </div>
            </div>
        `);

        const resources = this.projectPage.getResources();

        const image = fragment.querySelector('.image-component-image') as HTMLImageElement;
        image.src = resources.getAssetURL(this.url);

        if (this.alt) image.alt = this.alt || '';
        if (this.dimensions) {
            image.width = this.dimensions.width;
            image.height = this.dimensions.height;
        }

        if (this.caption) {
            const caption = document.createElement('div');
            caption.textContent = this.caption;
            caption.classList.add('image-component-caption');

            fragment.querySelector('.image-component-column')!.appendChild(caption);
        }

        return fragment.querySelector('.image-component') as HTMLDivElement;
    }
}