export class WebpageSectionTheme {
    backgroundColor;
    textColor;
    
    /**
     * Create a new `WebpageSectionTheme` with a background and text color.
     * @param {string} background 
     * @param {string} text 
     */
    constructor(background, text) {
        this.backgroundColor = background;
        this.textColor = text;
    }

    getBackgroundColor() {
        return this.backgroundColor;
    }

    getTextColor(opacity = 1) {
        return WebpageSectionTheme.hexBlend(this.backgroundColor, this.textColor, opacity);
    }

    /**
     * Blend two hex colors together.
     * @param {string} color1 
     * @param {string} color2 
     * @param {number} weight 
     * @returns {string}
     */
    static hexBlend(color1, color2, weight) {
        const a = WebpageSectionTheme.hexToRgb(color1);
        const b = WebpageSectionTheme.hexToRgb(color2);

        const rgb = [0, 1, 2].map(i => {
            return a[i] * (1 - weight) + b[i] * weight;
        });

        return WebpageSectionTheme.rgbToHex(rgb);
    }

    /**
     * Convert a hex color to an RGB array.
     * @param {string} hex 
     * @returns {number[]}
     */
    static hexToRgb(hex) {
        return hex.slice(1).match(/[A-Za-z0-9]{2}/g).map(v => parseInt(v, 16));
    }

    /**
     * Convert an RGB array to a hex color.
     * @param {number[]} rgb 
     * @returns {string}
     */
    static rgbToHex(rgb) {
        return '#' + rgb.map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
    }
}