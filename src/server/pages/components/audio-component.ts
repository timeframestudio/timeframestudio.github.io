import { Script } from "../../elements/script.js";
import { Stylesheet } from "../../elements/stylesheet.js";
import { WebpageElement } from "../../elements/webpage-element.js";
import { GeneratedPage } from "../generated-page.js";
import { BaseWebpageComponent } from "./base-webpage-component.js";
import { WebpageComponent } from "./webpage-component.js";

export class AudioComponent extends BaseWebpageComponent {
    private projectPage: GeneratedPage;

    constructor(private audioPath: string) {
        super();
    }

    async setupComponent(parentComponent: WebpageComponent, projectPage: GeneratedPage): Promise<void> {
        this.projectPage = projectPage;
    }

    *getWebpageElements(): Iterable<WebpageElement> {
        yield new Stylesheet('/css/audio.css');
    }

    createElement(document: Document): Node {
        const audio = document.createElement('div');
        audio.classList.add('audio-component');

        const player = document.createElement('audio');
        player.src = this.projectPage.getResources().getAssetURL(this.audioPath);
        player.controls = true;

        audio.appendChild(player);

        return audio;
    }
}