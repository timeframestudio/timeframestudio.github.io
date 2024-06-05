import { WebpageElement } from "./webpage-element.js";

export class Favicon implements WebpageElement {
    add(document: Document): void {
        let favElement = document.createElement('link');
        favElement.setAttribute('rel', 'icon');
        favElement.setAttribute('type', 'image/x-icon');
        favElement.setAttribute('href', '/assets/favicon.ico');

        document.head.appendChild(favElement);
    }
}