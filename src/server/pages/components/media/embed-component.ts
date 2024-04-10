import { Script } from "../../../elements/script.js";
import { Stylesheet } from "../../../elements/stylesheet.js";
import { WebpageElement } from "../../../elements/webpage-element.js";
import { GeneratedPage } from "../../generated-page.js";
import { BaseWebpageComponent } from "../base-webpage-component.js";
import { WebpageComponent } from "../webpage-component.js";

export class EmbedComponent extends BaseWebpageComponent {
    private projectPage: GeneratedPage;

    constructor(private source: string, private options: ({ aspect: number } | { width?: number, height: number }) = { aspect: 16 / 9 }) {
        super();
    }

    async setupComponent(parentComponent: WebpageComponent, projectPage: GeneratedPage): Promise<void> {
        this.projectPage = projectPage;
    }

    *getWebpageElements(): Iterable<WebpageElement> {
        yield new Script('/scripts/embed.js');
        yield new Stylesheet('/css/embed.css');
    }

    createElement(document: Document): Node {
        const embed = document.createElement('div');
        embed.classList.add('embed-component');

        const iframe = document.createElement('iframe');
        iframe.src = this.source.startsWith('./') ? this.projectPage.getResources().getAssetURL(this.source) : this.source;
        iframe.title = "Embedded content";
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');

        embed.appendChild(iframe);

        if ('aspect' in this.options) {
            embed.setAttribute('data-adaptive', '');
            embed.setAttribute('data-aspect', this.options.aspect.toString());
        } else if ('width' in this.options && this.options.width !== undefined) {
            iframe.setAttribute('width', this.options.width.toString());
            iframe.setAttribute('height', this.options.height.toString());
        } else if ('height' in this.options) {
            embed.setAttribute('data-adaptive', '');
            iframe.setAttribute('height', this.options.height.toString());
        }

        return embed;
    }
}