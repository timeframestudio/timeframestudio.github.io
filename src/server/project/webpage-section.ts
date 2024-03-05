import { WebpageElement } from "../elements/webpage-element.js";
import { WebpageComponent } from "./components/webpage-component.js";
import { ProjectPage } from "./project-page.js";

/**
 * The `WebpageSection` class represents a section of a webpage.
 */
export abstract class WebpageSection implements WebpageComponent {
    private theme: WebpageSection.Theme;

    setSectionTheme(sectionTheme: WebpageSection.Theme) {
        this.theme = sectionTheme;
    }

    /**
     * Gets the theme for this section.
     * @returns {WebpageSectionTheme}
     */
    getSectionTheme() {
        return this.theme;
    }

    abstract createElement(document: Document): HTMLElement;

    getWebpageElements(): Iterable<WebpageElement> {
        return new Set();
    }

    setupComponent(parentComponent: WebpageComponent | null, projectPage: ProjectPage): Promise<void> {
        return Promise.resolve();
    }
}

export namespace WebpageSection {
    class WebpageSectionTheme {
        backgroundColor: string;
        textColor: string;

        constructor(backgroundColor: string, textColor: string) {
            this.backgroundColor = backgroundColor;
            this.textColor = textColor;
        }
    
        getBackgroundColor() {
            return this.backgroundColor;
        }
    
        getTextColor(opacity = 1) {
            return WebpageSectionTheme.mixColors(this.backgroundColor, this.textColor, opacity);
        }
    
        static mixColors(color1: string, color2: string, weight: number) {
            const a = WebpageSectionTheme.hexToRgb(color1);
            const b = WebpageSectionTheme.hexToRgb(color2);
    
            const rgb = [0, 1, 2].map(i => {
                return a[i] * (1 - weight) + b[i] * weight;
            });
    
            return WebpageSectionTheme.rgbToHex(rgb);
        }
    
        static hexToRgb(hex: string): number[] {
            return hex.slice(1).match(/[A-Za-z0-9]{2}/g)!.map(v => parseInt(v, 16));
        }
    
        static rgbToHex(rgb: number[]): string {
            return '#' + rgb.map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
        }
    };

    export const Theme = {
        Light: new WebpageSectionTheme('#ffffff', '#444444'),
        AltLight: new WebpageSectionTheme('#f8f8f8', '#444444'),
        Dark: new WebpageSectionTheme('#444444', '#dddddd')
    };

    export type Theme = WebpageSectionTheme;
}