import { EmbedComponent } from "./embed-component.js";

export class SlidesComponent extends EmbedComponent {
    constructor(embedCode: string) {
        super(/src="([^"]+)"/.exec(embedCode)![1], {
            aspect: 960 / 569
        });
    }

    createElement(document: Document): Node {
        const video = super.createElement(document) as HTMLDivElement;
        const iframe = video.querySelector('iframe') as HTMLIFrameElement;

        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('width', '960');
        iframe.setAttribute('height', '569');
        iframe.setAttribute('mozallowfullscreen', 'true');
        iframe.setAttribute('webkitallowfullscreen', 'true');

        return video;
    }
}