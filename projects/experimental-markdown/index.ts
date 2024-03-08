import { HeadingComponent } from "../../src/server/project/components/heading-component.js";
import { ProjectPageRouter } from "../../src/server/project/project-page-router.js";
import { ProjectPage } from "../../src/server/project/project-page.js";
import { MarkdownLoader } from "../../src/server/project/rich-text/markdown-loader.js";
import { HeaderSection } from "../../src/server/project/sections/header-section.js";
import { PaddedSection } from "../../src/server/project/sections/padded-section.js";

class MainPage extends ProjectPage {
    async generateWebpage(): Promise<string> {
        this.addPageSections(new HeaderSection());
        this.addPageSections(new PaddedSection(
            new HeadingComponent('Experimental Markdown'),
            ...MarkdownLoader.load(this.getProjectOutline().getPageContent()['Section 1'])
        ));
        
        return await super.generateWebpage();
    }
}

const router = new ProjectPageRouter();

router.addPage('/', new MainPage());

export default router;