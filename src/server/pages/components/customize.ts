import { WebpageElement } from "../../elements/webpage-element.js";
import { BaseWebpageComponent } from "./base-webpage-component.js";
import { WebpageComponent } from "./webpage-component.js";

export function customize(component: WebpageComponent, func: (element: Node, document: Document) => Node): WebpageComponent {
    return new (class extends BaseWebpageComponent {
        getWebpageElements(): Iterable<WebpageElement> {
            return component.getWebpageElements();
        }

        setupComponent(parentComponent: WebpageComponent, projectPage: import("../generated-page.js").GeneratedPage): Promise<void> {
            return component.setupComponent(parentComponent, projectPage);
        }

        createElement(document: Document): Node {
            return func(component.createElement(document), document);
        }
    });
}

export namespace customize {
    export function setRowMaxHeight(maxHeight: string) {
        return (element: Node): Node => {
            ((element as HTMLElement).querySelector('.row-component') as HTMLElement).style.maxHeight = maxHeight;

            return element;
        };
    }

    export function centerText() {
        return (element: Node): Node => {
            (element as HTMLElement).style.textAlign = 'center';

            return element;
        };
    }
}