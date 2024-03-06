import express from "express";

export interface Webpage {
    setupWebpage(): Promise<void>;
    getPageHTML(): string;
    getRouteHandler(): (req: express.Request, res: express.Response) => void;
}