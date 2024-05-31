import { RequestHandler } from "express";
import { Router } from "./router.js";
import fs from "fs/promises";
import * as express from "express";
import url from "url";
import path from "path";
import { HomePage } from "../pages/home-page.js";
import { AboutPage } from "../pages/about-page.js";
import { ErrorPage } from "../pages/error-page.js";

export class WebsiteRouter implements Router {
    private root: string = url.fileURLToPath(new URL('..', import.meta.url));

    private home: string;
    private about: string;
    private error: string;

    async setup(): Promise<void> {
        console.log("Setting up website router");

        console.log("Generating static pages (1/3)");

        const home = new HomePage();
        await home.setupWebpage();
        this.home = home.getPageHTML();

        console.log("Generating static pages (2/3)");

        const about = new AboutPage();
        await about.setupWebpage();
        this.about = about.getPageHTML();

        console.log("Generating static pages (3/3)");

        const error = new ErrorPage();
        await error.setupWebpage();
        this.error = error.getPageHTML();
    }

    getStaticFiles(): Map<string, string> {
        const files = new Map();

        files.set('/index.html', this.home);
        files.set('/about.html', this.about);
        files.set('/error.html', this.error);

        return files;
    }

    getRouteHandler(): RequestHandler {
        const router = express.Router();

        router.get('/', (req, res) => {
            res.type('.html').send(this.home);
        });

        router.get('/about', (req, res) => {
            res.type('.html').send(this.about);
        });

        router.get('/error', (req, res) => {
            res.type('.html').send(this.error);
        });

        return router;
    }
}