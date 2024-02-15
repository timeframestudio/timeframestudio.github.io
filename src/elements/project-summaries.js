import { ProjectDatabase } from "../project/project-database.js";
import { Script } from "./script.js";

export class ProjectSummaries extends Script {
    constructor() {
        super({
            raw: `window._projectSummaryData = ${JSON.stringify(ProjectDatabase.instance.getProjectSummaries())};`,
            preferred: true
        });
    }
}