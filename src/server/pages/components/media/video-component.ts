import { EmbedComponent } from "./embed-component.js";

export class VideoComponent extends EmbedComponent {
    constructor(videoId: string) {
        super(`https://www.youtube.com/embed/${videoId}`, {
            aspect: 966 / 543
        });
    }

    createElement(document: Document): Node {
        const video = super.createElement(document) as HTMLDivElement;
        const iframe = video.querySelector('iframe') as HTMLIFrameElement;

        iframe.title = "Embedded video";
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;');
        iframe.setAttribute('referrerpolicy', 'access-control-allow-origin');
        iframe.setAttribute('allowfullscreen', '');

        return video;
    }
}