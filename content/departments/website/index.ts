import { PageRouter } from "../../../src/server/pages/page-router.js";
import { GeneratedPage } from "../../../src/server/pages/generated-page.js";
import { HeaderSection } from "../../../src/server/pages/sections/header-section.js";

class WebsiteDepartmentPage extends GeneratedPage {
    async generateWebpage(): Promise<string> {
        this.add(new HeaderSection());

        return await super.generateWebpage();
    }
}

const router = new PageRouter();

router.addPage('/', new WebsiteDepartmentPage());

export default router;