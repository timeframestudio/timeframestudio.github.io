import { Router } from "../website/router.js";

export interface CollectionEntry extends Router {
    getPreviewData(): any;
    getPath(): string;
    getURL(): string;
    getAssetURL(asset?: string): string;
}