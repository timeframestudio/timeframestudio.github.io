let pretty;
try {
    let { default: pkg } = await import('pretty');
    pretty = pkg;
} catch (err) {}

/**
 * Pretty prints HTML code.
 * @param {string} html
 * @returns {string}
 */
export function prettyPrint(html) {
    if (pretty) {
        return pretty(html);
    }

    return html;
}