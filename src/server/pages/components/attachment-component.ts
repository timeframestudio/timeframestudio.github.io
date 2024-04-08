import { Stylesheet } from "../../elements/stylesheet.js";
import { WebpageElement } from "../../elements/webpage-element.js";
import { GeneratedPage } from "../generated-page.js";
import { BaseWebpageComponent } from "./base-webpage-component.js";
import { WebpageComponent } from "./webpage-component.js";

export class AttachmentComponent extends BaseWebpageComponent {
    constructor(private attachments: AttachmentComponent.Attachment[] = []) {
        super();
    }

    createElement(document: Document): HTMLElement {
        const element = document.createElement('div');
        element.classList.add('attachment-component');

        for (const attachment of this.attachments) {
            element.appendChild(attachment.createElement(document));
        }

        return element;
    }

    async setupComponent(parentComponent: WebpageComponent, projectPage: GeneratedPage): Promise<void> {
        for (const attachment of this.attachments) {
            attachment.setupComponent(this, projectPage);
        }
    }

    *getWebpageElements() {
        yield new Stylesheet('/css/attachment.css');

        for (const attachment of this.attachments) {
            yield* attachment.getWebpageElements();
        }
    }
}

export namespace AttachmentComponent {
    export class Attachment extends BaseWebpageComponent {
        constructor(private title: string, private url: string, private fileName: string = title) {
            super();
        }

        getTitle() {
            return this.title;
        }

        getUrl() {
            return this.url;
        }

        getFileName() {
            return this.fileName;
        }

        createElement(document: Document): HTMLElement {
            const element = document.createElement('div');
            element.classList.add('attachment');
    
            const name = document.createElement('div');
            name.classList.add('attachment-name');
            name.textContent = this.title;
    
            element.appendChild(name);
    
            const download = document.createElement('a');
            download.classList.add('attachment-download');
            download.href = this.url;
            download.textContent = 'Download';
            download.download = this.fileName;
    
            element.appendChild(download);
    
            return element;
        }
    }
}