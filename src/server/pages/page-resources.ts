export interface PageResources {
    getTitle(): string;
    getSubtitle(): string;

    getPageContent(): { [key: string]: string };
    setPageContent(content: { [key: string]: string }): void;

    /**
     * Returns the path to the directory of the page.
     */
    getFilePath(): string;

    /**
     * Returns the URL to the assets for the page (e.g. `/assets/project/example/turtle.png`).
     */
    getAssetURL(path: string): string;

    /**
     * Returns the path to the script file for the page in the `dist` directory.
     */
    getScriptPath(): string;

    /**
     * Returns the title of the page.
     */
    getPageTitle(): string;
}