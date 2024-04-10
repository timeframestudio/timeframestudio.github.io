import { Script } from "../../../elements/script.js";
import { Stylesheet } from "../../../elements/stylesheet.js";
import { WebpageElement } from "../../../elements/webpage-element.js";
import { GeneratedPage } from "../../generated-page.js";
import { BaseWebpageComponent } from "../base-webpage-component.js";
import { WebpageComponent } from "../webpage-component.js";
import { Tab } from "./tab.js";

export class TabsComponent extends BaseWebpageComponent {
    constructor(private tabs: Tab[]) {
        super();
    }

    *getWebpageElements(): Iterable<WebpageElement> {
        yield new Script('/scripts/tabs.js');
        yield new Stylesheet('/css/tabs.css');

        for (const tab of this.tabs) {
            yield* tab.getWebpageElements();
        }
    }

    async setupComponent(parentComponent: WebpageComponent, projectPage: GeneratedPage): Promise<void> {
        for (const tab of this.tabs) {
            await tab.setupComponent(this, projectPage);
        }
    }

    createElement(document: Document): Node {
        const tabs = document.createElement('div');
        tabs.classList.add('tabs-component');

        const tabBar = document.createElement('div');
        tabBar.classList.add('tab-bar');

        let tabIndex = 0;
        for (const tab of this.tabs) {
            const tabElement = tab.createTabElement(document);
            tabElement.setAttribute('data-tab-index', tabIndex.toString());
            tabBar.appendChild(tabElement);

            tabIndex++;
        }

        tabs.appendChild(tabBar);

        const tabContent = document.createElement('div');
        tabContent.classList.add('tab-content-wrapper');

        let contentIndex = 0;
        for (const tab of this.tabs) {
            const tabElement = tab.createElement(document);
            tabElement.setAttribute('data-tab-index', contentIndex.toString());
            tabContent.appendChild(tabElement);

            contentIndex++;
        }

        tabs.appendChild(tabContent);

        return tabs;
    }
}