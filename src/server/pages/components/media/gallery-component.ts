import { Stylesheet } from "../../../elements/stylesheet.js";
import { GeneratedPage } from "../../generated-page.js";
import { BaseWebpageComponent } from "../base-webpage-component.js";
import { WebpageComponent } from "../webpage-component.js";

export class GalleryComponent extends BaseWebpageComponent {
    private projectPage: GeneratedPage;

    constructor(private images: string[]) {
        super();
    }

    *getWebpageElements() {
        yield new Stylesheet('/css/gallery.css');
    }

    async setupComponent(parentComponent: WebpageComponent, projectPage: GeneratedPage): Promise<void> {
        this.projectPage = projectPage;
    }

    createElement(document: Document) {
        const gallery = document.createElement('div');
        gallery.classList.add('image-gallery');

        const contents = document.createElement('div');
        contents.classList.add('image-gallery-contents');

        for (const image of this.images) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('image-gallery-image-wrapper');

            const imageElement = document.createElement('img');
            imageElement.classList.add('image-gallery-image');
            imageElement.src = this.projectPage.getResources().getAssetURL(image);

            wrapper.appendChild(imageElement);
            contents.appendChild(wrapper);
        }

        gallery.appendChild(contents);

        return gallery;
    }
}