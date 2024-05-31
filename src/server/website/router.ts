import * as express from "express";

export interface Router {
    setup(): Promise<void>;
    getStaticFiles(): Map<string, string>;
    getRouteHandler(): express.RequestHandler;
}