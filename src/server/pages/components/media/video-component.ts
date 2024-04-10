import { Script } from "../../../elements/script.js";
import { Stylesheet } from "../../../elements/stylesheet.js";
import { WebpageElement } from "../../../elements/webpage-element.js";
import { BaseWebpageComponent } from "../base-webpage-component.js";

export class VideoComponent extends BaseWebpageComponent {
    constructor(private videoId: string) {
        super();
    }

    *getWebpageElements(): Iterable<WebpageElement> {
        yield new Script('/scripts/video.js');
        yield new Stylesheet('/css/video.css');
    }

    createElement(document: Document): Node {
        const video = document.createElement('div');
        video.classList.add('video-component');

        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${this.videoId}`;
        iframe.title = "Embedded video";
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;');
        iframe.setAttribute('referrerpolicy', 'access-control-allow-origin');
        iframe.setAttribute('allowfullscreen', '');

        video.appendChild(iframe);

        return video;
    }
}