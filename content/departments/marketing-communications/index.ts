import { PageRouter } from "../../../src/server/pages/page-router.js";
import { GeneratedPage } from "../../../src/server/pages/generated-page.js";
import { HeaderSection } from "../../../src/server/pages/sections/header-section.js";
import { PaddedSection } from "../../../src/server/pages/sections/padded-section.js";
import { HeadingComponent } from "../../../src/server/pages/components/text/heading-component.js";
import { MarkdownLoader } from "../../../src/server/pages/components/text/markdown-loader.js";
import { VideoComponent } from "../../../src/server/pages/components/media/video-component.js";
import { GalleryComponent } from "../../../src/server/pages/components/media/gallery-component.js";
import { MarginComponent } from "../../../src/server/pages/components/layout/margin-component.js";
import { RowComponent } from "../../../src/server/pages/components/layout/row-component.js";
import { ItemComponent } from "../../../src/server/pages/components/layout/item-component.js";
import { ImageComponent } from "../../../src/server/pages/components/media/image-component.js";

class WebsiteDepartmentPage extends GeneratedPage {
    async generateWebpage(): Promise<string> {
        this.add(new PaddedSection(
            new HeadingComponent("Marketing & Communications Department"),
            ...MarkdownLoader.load(this.getResources().getContent('Department Statement')),
            new HeadingComponent("Logo Showcase", 2),
            ...MarkdownLoader.load(this.getResources().getContent('Showcase Description')),
            new MarginComponent(),
            new VideoComponent(this.getResources().getContent('Showcase Video')),
            new HeadingComponent("Flyers", 2),
            ...MarkdownLoader.load(this.getResources().getContent('Flyer Description')),
            new MarginComponent(),
            new GalleryComponent([ 'flyer1.png', 'flyer2.png' ]),
            new HeadingComponent("Team Members", 2),
            new MarginComponent(),
            new RowComponent([
                new ItemComponent(1, new ImageComponent('paul.jpg', { caption: "Paul" })),
                new ItemComponent(1, new ImageComponent('roham.jpg', { caption: "Roham" })),
                new ItemComponent(1, new ImageComponent('tima.jpg', { caption: "Tima" }))
            ]),
            new MarginComponent()
        ));

        return await super.generateWebpage();
    }
}

const router = new PageRouter();

router.addPage('/', new WebsiteDepartmentPage());

export default router;