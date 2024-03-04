import express from "express";
import { ProjectOutline } from "./project-outline.js";
import { ProjectPage } from "./project-page.js";
import path from "path";

export class Project {
    /**
     * The outline of the project.
     * @type {ProjectOutline}
     * @private
     * @readonly
     */
    outline;

    /**
     * The HTML of the project pages.
     * @type {Map<string, string>}
     * @private
     */
    pages = new Map();

    /**
     * Create a new `Project`.
     * @param {ProjectOutline} outline The outline of the project.
     */
    constructor(outline) {
        this.outline = outline;
    }

    /**
     * Set up the project.
     */
    async setupProject() {
        const pageScripts = this.outline.getPageScripts();

        for (let [ routePath, scriptPath ] of pageScripts) {
            /** @type {{ default: ProjectPage }} */
            const { default: project } = await import(path.join(this.outline.getFilePath(), scriptPath));

            project.bindProjectOutline(this.outline);

            await project.setup();

            const html = project.getPageHTML();

            this.pages.set(routePath, html);
        }
    }

    /**
     * Get the page router for the project.
     * @returns {express.RequestHandler}
     */
    getPageRouter() {
        const router = express.Router();

        for (let [ routePath, html ] of this.pages) {
            router.get(routePath, (req, res) => {
                res.send(html);
            });
        }

        return router;
    }

    /**
     * Get the asset router for the project.
     * @returns {express.RequestHandler}
     */
    getAssetRouter() {
        return express.static(this.outline.getAssetURL());
    }

    /**
     * Get the outline of the project.
     * @returns {ProjectOutline}
     */
    getProjectOutline() {
        return this.outline;
    }
}