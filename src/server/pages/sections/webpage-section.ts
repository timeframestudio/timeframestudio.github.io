import { WebpageElement } from "../../elements/webpage-element.js";
import { WebpageComponent } from "../components/webpage-component.js";
import { GeneratedPage } from "../generated-page.js";

/**
 * The `WebpageSection` class represents a section of a webpage.
 */
export abstract class WebpageSection implements WebpageComponent {
    private theme: WebpageSection.Theme = WebpageSection.Theme.Light;

    setSectionTheme(sectionTheme: WebpageSection.Theme) {
        this.theme = sectionTheme;
    }

    getSectionTheme(): WebpageSection.Theme {
        return this.theme;
    }

    protected addTheme(element: HTMLElement) {
        element.classList.add('themed-section');
        element.classList.add(this.theme.getClass());
    }

    abstract createElement(document: Document): HTMLElement;

    getWebpageElements(): Iterable<WebpageElement> {
        return new Set();
    }

    setupComponent(parentComponent: WebpageComponent | null, projectPage: GeneratedPage): Promise<void> {
        return Promise.resolve();
    }
}

export namespace WebpageSection {
    class WebpageSectionTheme {
        constructor(private name: string) {
        }

        getClass(): string {
            return 'theme-' + this.name;
        }
    };

    export const Theme = {
        Light: new WebpageSectionTheme('light'),
        AltLight: new WebpageSectionTheme('alt-light'),
        Dark: new WebpageSectionTheme('dark')
    };

    export type Theme = WebpageSectionTheme;
}