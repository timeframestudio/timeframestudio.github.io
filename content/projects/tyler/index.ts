import { MarginComponent } from "../../../src/server/pages/components/layout/margin-component.js";
import { VideoComponent } from "../../../src/server/pages/components/media/video-component.js";
import { HeadingComponent } from "../../../src/server/pages/components/text/heading-component.js";
import { MarkdownLoader } from "../../../src/server/pages/components/text/markdown-loader.js";
import { WebpageComponent } from "../../../src/server/pages/components/webpage-component.js";
import { PageRouter } from "../../../src/server/pages/page-router.js";
import { SimplePage, SimplePageFields } from "../../../src/server/utils/simple-page.js";

class CustomPage extends SimplePage {
    protected async *generateArtwork(): AsyncIterable<WebpageComponent> {
        yield new HeadingComponent('Project Artwork');

        const description = this.getResources().getContent(SimplePageFields.artwork);
        if (description) yield* MarkdownLoader.load(description);

        yield new VideoComponent(this.getResources().getContent("Project Artwork Video"));
        yield new MarginComponent();
    }
}

const router = new PageRouter();

router.addPage('/', new CustomPage());

export default router;