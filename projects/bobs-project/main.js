import { ProjectPage } from "../../src/project/project-page.js";
import { HeaderSection } from "../../src/project/sections/header-section.js";

export default new (class extends ProjectPage {
    async setup() {
        this.addPageSections(new HeaderSection());
        await super.setup();
    }
});