import { customize } from "../../../src/server/pages/components/customize.js";
import { ItemComponent } from "../../../src/server/pages/components/layout/item-component.js";
import { MarginComponent } from "../../../src/server/pages/components/layout/margin-component.js";
import { RowComponent } from "../../../src/server/pages/components/layout/row-component.js";
import { ImageComponent } from "../../../src/server/pages/components/media/image-component.js";
import { VideoComponent } from "../../../src/server/pages/components/media/video-component.js";
import { Tab } from "../../../src/server/pages/components/tabs/tab.js";
import { TabsComponent } from "../../../src/server/pages/components/tabs/tabs-component.js";
import { HeadingComponent } from "../../../src/server/pages/components/text/heading-component.js";
import { MarkdownLoader } from "../../../src/server/pages/components/text/markdown-loader.js";
import { WebpageComponent } from "../../../src/server/pages/components/webpage-component.js";
import { GeneratedPage } from "../../../src/server/pages/generated-page.js";
import { PageRouter } from "../../../src/server/pages/page-router.js";
import { HeaderSection } from "../../../src/server/pages/sections/header-section.js";
import { PaddedSection } from "../../../src/server/pages/sections/padded-section.js";
import { WebpageSection } from "../../../src/server/pages/sections/webpage-section.js";

class MainPage extends GeneratedPage {
    async generateWebpage(): Promise<string> {
        const header = new HeaderSection();

        header.setBackgroundImage('letter.jpeg', {
            backgroundPosition: 'top center',
            backgroundTint: '#ffffff55'
        });

        this.add(header);

        this.add(new PaddedSection(
            new MarginComponent(),
            ...MarkdownLoader.load(this.getResources().getContent('Overview')),
            new MarginComponent()
        ));

        const history = new PaddedSection(
            new MarginComponent(),
            ...MarkdownLoader.load(this.getResources().getContent('Historical Background')),
            new MarginComponent()
        );

        history.setSectionTheme(WebpageSection.Theme.AltLight);

        this.add(history);

        this.add(new PaddedSection(
            ...MarkdownLoader.load(this.getResources().getContent('Conflict')),
            new MarginComponent(),
            customize(new RowComponent([
                new ItemComponent(0.5,
                    new ImageComponent('./james-vi-and-i.jpeg', { caption: 'James VI and I' })
                ),
                new ItemComponent(0.5,
                    new ImageComponent('./robert-catesby.jpeg', { caption: 'Robert Catesby' })
                )
            ]), customize.setRowMaxHeight('50vh')),
            new MarginComponent()
        ));

        const pitch = new PaddedSection(
            new MarginComponent(),
            new HeadingComponent('Video Pitch'),
            new VideoComponent('9xwazD5SyVg'),
            new MarginComponent(),
            ...MarkdownLoader.load(this.getResources().getContent('Pitch Slides Link')),
            new HeadingComponent('Storyboards'),
            ...MarkdownLoader.load(this.getResources().getContent('Storyboard Info')),
            new MarginComponent(),
            new RowComponent([
                new ItemComponent(1.0, new ImageComponent('./storyboard.jpeg', { caption: "Draft 1" })),
                new ItemComponent(1.0, new ImageComponent('./storyboard.jpeg', { caption: "Draft 2" })),
                new ItemComponent(1.0, new ImageComponent('./storyboard.jpeg', { caption: "Final Draft" })),
            ]),
            new MarginComponent(),
            new HeadingComponent("Characters"),
            new TabsComponent([
                new Tab('James VI and I', [
                    new MarginComponent(),
                    ...MarkdownLoader.load(this.getResources().getContent('Characters / James VI and I')),
                    new RowComponent([
                        new ItemComponent(1, ...MarkdownLoader.load(this.getResources().getContent('Story Circle / James VI and I'))),
                        new ItemComponent(0.5,
                            new HeadingComponent('Character Art', 2),
                            new ImageComponent('./james-vi-and-i-art.jpeg')
                        )
                    ])
                ]),
                new Tab('Robert Catesby', [
                    new MarginComponent(),
                    ...MarkdownLoader.load(this.getResources().getContent('Characters / Robert Catesby')),
                    new RowComponent([
                        new ItemComponent(1, ...MarkdownLoader.load(this.getResources().getContent('Story Circle / Robert Catesby'))),
                        new ItemComponent(0.5,
                            new HeadingComponent('Character Art', 2),
                            new ImageComponent('./robert-catesby.jpeg')
                        )
                    ])
                ])
            ]),
            new MarginComponent()
        );

        pitch.setSectionTheme(WebpageSection.Theme.Dark);

        this.add(pitch);

        const timeline = new PaddedSection(
            ...MarkdownLoader.load(this.getResources().getContent('Timeline')),
            new MarginComponent()
        );

        timeline.setSectionTheme(WebpageSection.Theme.AltLight);

        this.add(timeline);

        this.add(new PaddedSection(
            ...MarkdownLoader.load(this.getResources().getContent('Historical Bonus Content')),
            new MarginComponent()
        ));

        const resources = new PaddedSection(
            ...MarkdownLoader.load(this.getResources().getContent('Resources')),
            new MarginComponent()
        );

        resources.setSectionTheme(WebpageSection.Theme.AltLight);

        this.add(resources);
        
        return await super.generateWebpage();
    }
}

const router = new PageRouter();

router.addPage('/', new MainPage());

export default router;