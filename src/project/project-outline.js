import path from "path";
import url from "url";

export class ProjectOutline {
    /**
     * @private
     * @type {string}
    */
    title;

    /**
     * @private
     * @type {string}
     */
    author;

    /**
     * @private
     * @type {string}
     */
    description;

    /**
     * @private
     * @type {string}
     */
    projectId;

    /**
     * @private
     * @type {[number, number]}
     */
    mapLocation;

    /**
     * @private
     * @type {Map<string, string>}
     */
    pageScripts;

    getTitle() {
        return this.title;
    }

    getAuthor() {
        return this.author;
    }

    getDescription() {
        return this.description
    }

    getProjectId() {
        return this.projectId;
    }

    getMapLocation() {
        return this.mapLocation;
    }

    getPageScripts() {
        return this.pageScripts;
    }
    
    /**
     * Get the URL of the project's assets.
     * @returns {string}
     */
    getAssetURL() {
        return `/assets/project/${this.getProjectId()}/`;
    }

    /**
     * Get the file path of the project.
     * @returns {string}
     */
    getFilePath() {
        return url.fileURLToPath(new URL(path.join('../..', 'projects', this.getProjectId()), import.meta.url));
    }

    /**
     * Get the outline data of the project to be served to the client.
     * @returns {object}
     */
    getOutlineData() {
        return {
            title: this.getTitle(),
            author: this.getAuthor(),
            description: this.getDescription(),
            id: this.getProjectId(),
            location: this.getMapLocation()
        };
    }

    /**
     * Create a new `ProjectOutline` from a project.json file.
     * @param {{ title: string, author: string, description: string, location: [ number, number ], pages: { [ path: string ]: string } }} outlineData
     * @param {string} id
     * @returns {ProjectOutline}
     */
    static fromProjectData(outlineData, id) {
        ProjectOutline.validateProjectData(outlineData);

        let outline = new ProjectOutline();

        outline.title = outlineData.title;
        outline.author = outlineData.author;
        outline.description = outlineData.description;
        outline.mapLocation = outlineData.location;
        outline.pageScripts = new Map(Object.entries(outlineData.pages));

        outline.projectId = id;

        return outline;
    }

    /**
     * Validate the project data.
     * @param {{ title: string, author: string, description: string, location: [ number, number ], pages: { [ path: string ]: string } }} outlineData
     * @throws {Error} If the project data is invalid.
     * @private
     */
    static validateProjectData(outlineData) {
        if (!outlineData.title) throw new Error("Project outline does not have a title.");
        if (typeof outlineData.title !== "string") throw new Error("Project outline title is not a string.");
        if (!outlineData.author) throw new Error("Project outline does not have an author.");
        if (typeof outlineData.author !== "string") throw new Error("Project outline author is not a string.");
        if (!outlineData.description) throw new Error("Project outline does not have a description.");
        if (typeof outlineData.description !== "string") throw new Error("Project outline description is not a string.");
        if (!outlineData.location) throw new Error("Project outline does not have a location.");
        if (!Array.isArray(outlineData.location)) throw new Error("Project outline location is not an array.");
        if (outlineData.location.length !== 2) throw new Error("Project outline location does not have two elements.");
        if (typeof outlineData.location[0] !== "number") throw new Error("Project outline location x is not a number.");
        if (typeof outlineData.location[1] !== "number") throw new Error("Project outline location y is not a number.");
        if (!outlineData.pages) throw new Error("Project outline does not have pages.");
        if (typeof outlineData.pages !== "object") throw new Error("Project outline pages is not an object.");

        for (let [ path, scriptPath ] of Object.entries(outlineData.pages)) {
            if (typeof path !== "string") throw new Error("Project outline page path is not a string.");
            if (typeof scriptPath !== "string") throw new Error("Project outline page script path is not a string.");
        }
    }
}