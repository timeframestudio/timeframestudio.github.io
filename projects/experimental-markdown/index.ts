import { HeadingComponent } from "../../src/server/pages/components/heading-component.js";
import { ProjectPageRouter } from "../../src/server/project/project-page-router.js";
import { GeneratedPage } from "../../src/server/pages/generated-page.js";
import { MarkdownLoader } from "../../src/server/pages/components/text/markdown-loader.js";
import { HeaderSection } from "../../src/server/pages/sections/header-section.js";
import { PaddedSection } from "../../src/server/pages/sections/padded-section.js";

class MainPage extends GeneratedPage {
    async generateWebpage(): Promise<string> {
        this.addPageSections(new HeaderSection());
        this.addPageSections(new PaddedSection(
            new HeadingComponent('Experimental Markdown'),
            ...MarkdownLoader.load(this.getResources().getPageContent()['Section 1'])
        ));
        
        return await super.generateWebpage();
    }
}

const router = new ProjectPageRouter();

router.addPage('/', new MainPage());

export default router;