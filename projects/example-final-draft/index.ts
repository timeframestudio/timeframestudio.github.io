import { ProjectPageRouter } from "../../src/server/project/project-page-router.js";
import { ProjectPage } from "../../src/server/project/project-page.js";
import { HeaderSection } from "../../src/server/project/sections/header-section.js";

class MainPage extends ProjectPage {
    async setupWebpage() {
        this.addPageSections(new HeaderSection());

        await super.setupWebpage();
    }
};

const mainPage = new MainPage();

const router = new ProjectPageRouter();

router.addPage("/", mainPage);

export default router;