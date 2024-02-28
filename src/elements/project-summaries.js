import { ProjectDatabase } from "../project/project-database.js";
import { Script } from "./script.js";

/**
 * The `ProjectSummaries` class represents a script that can be added to a webpage
 * to provide the project summaries data to the client.
 */
export class ProjectSummaries extends Script {
    constructor() {
        super({
            raw: `window._projectSummaryData = ${JSON.stringify(ProjectDatabase.instance.getProjectSummaries())};`,
            preferred: true
        });
    }
}