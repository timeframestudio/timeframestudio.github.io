import { WebpageComponent } from "./components/webpage-component.js";
import { WebpageSectionTheme } from "./webpage-section-theme.js";

/**
 * The `WebpageSection` class represents a section of a webpage.
 * @abstract
 */
export class WebpageSection extends WebpageComponent {
    static Theme = {
        Light: new WebpageSectionTheme('#ffffff', '#444444'),
        AltLight: new WebpageSectionTheme('#f8f8f8', '#444444'),
        Dark: new WebpageSectionTheme('#444444', '#dddddd')
    };

    /**
     * The theme for this section.
     * @type {WebpageSectionTheme} #theme
     */
    #theme;

    /**
     * Sets the theme for this section.
     * @param {WebpageSectionTheme} sectionTheme 
     */
    setSectionTheme(sectionTheme) {
        this.#theme = sectionTheme;
    }

    /**
     * Gets the theme for this section.
     * @returns {WebpageSectionTheme}
     */
    getSectionTheme() {
        return this.#theme;
    }
}