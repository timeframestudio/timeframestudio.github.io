import { ProjectPageRouter } from "../../src/server/project/project-page-router.js";
import { GeneratedPage } from "../../src/server/pages/generated-page.js";
import { HeaderSection } from "../../src/server/pages/sections/header-section.js";

class MainPage extends GeneratedPage {
    async setupWebpage() {
        this.addPageSections(new HeaderSection());

        await super.setupWebpage();
    }
};

const mainPage = new MainPage();

const router = new ProjectPageRouter();

router.addPage("/", mainPage);

export default router;