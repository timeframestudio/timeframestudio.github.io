import { PageRouter } from "../../../src/server/pages/page-router.js";
import { GeneratedPage } from "../../../src/server/pages/generated-page.js";
import { HeaderSection } from "../../../src/server/pages/sections/header-section.js";
import { PaddedSection } from "../../../src/server/pages/sections/padded-section.js";
import { HeadingComponent } from "../../../src/server/pages/components/text/heading-component.js";
import { MarkdownLoader } from "../../../src/server/pages/components/text/markdown-loader.js";
import { MarginComponent } from "../../../src/server/pages/components/layout/margin-component.js";
import { ImageComponent } from "../../../src/server/pages/components/media/image-component.js";
import { RowComponent } from "../../../src/server/pages/components/layout/row-component.js";
import { ItemComponent } from "../../../src/server/pages/components/layout/item-component.js";
import { customize } from "../../../src/server/pages/components/customize.js";

class WebsiteDepartmentPage extends GeneratedPage {
    async generateWebpage(): Promise<string> {
        this.add(new PaddedSection(
            ...MarkdownLoader.load(this.getResources().getContent('Overview')),
            new MarginComponent()
        ));

        const development = new PaddedSection(
            ...MarkdownLoader.load(this.getResources().getContent('Development')),
            new MarginComponent(),
            new ImageComponent('diagram.svg'),
            new MarginComponent(),
            ...MarkdownLoader.load(this.getResources().getContent('Development (2)')),
            new MarginComponent()
        );

        development.setSectionTheme(PaddedSection.Theme.AltLight);

        this.add(development);

        const team = new PaddedSection(
            new HeadingComponent("Team Members", 2),
            new MarginComponent(),
            new RowComponent([
                new ItemComponent(1, new ImageComponent('brian.jpg', { caption: "Brian" })),
                new ItemComponent(1, new ImageComponent('cayo.jpg', { caption: "Cayo" })),
                new ItemComponent(1, new ImageComponent('henry.jpg', { caption: "Henry" })),
                new ItemComponent(1, new ImageComponent('imran.jpg', { caption: "Imran" })),
                new ItemComponent(1, new ImageComponent('weston.jpg', { caption: "Weston" }))
            ]),
            new MarginComponent()
        );

        this.add(team);

        return await super.generateWebpage();
    }
}

const router = new PageRouter();

router.addPage('/', new WebsiteDepartmentPage());

export default router;