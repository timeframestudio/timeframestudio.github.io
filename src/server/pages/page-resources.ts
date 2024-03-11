export interface PageResources {
    getAssetURL(path: string): string;
    getTitle(): string;
    getSubtitle(): string;
    getPageContent(): { [key: string]: string };
    setPageContent(content: { [key: string]: string }): void;
}