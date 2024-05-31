import { CachedRouter } from "../../../src/server/pages/cached-router.js";
import { GeneratedPage } from "../../../src/server/pages/generated-page.js";
import { HeaderSection } from "../../../src/server/pages/sections/header-section.js";
import { PaddedSection } from "../../../src/server/pages/sections/padded-section.js";
import { HeadingComponent } from "../../../src/server/pages/components/text/heading-component.js";
import { MarkdownLoader } from "../../../src/server/pages/components/text/markdown-loader.js";

class WebsiteDepartmentPage extends GeneratedPage {
    async generateWebpage(): Promise<string> {
        this.add(new PaddedSection(
            ...MarkdownLoader.load(this.getCollectionEntry().getContent('Overview')
        )));

        return await super.generateWebpage();
    }
}

const router = new CachedRouter();

router.addPage('/', new WebsiteDepartmentPage());

export default router;