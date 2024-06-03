import { MarginComponent } from "../pages/components/layout/margin-component.js";
import { RowComponent } from "../pages/components/layout/row-component.js";
import { DocumentComponent } from "../pages/components/media/document-component.js";
import { EmbedComponent } from "../pages/components/media/embed-component.js";
import { GalleryComponent } from "../pages/components/media/gallery-component.js";
import { ImageComponent } from "../pages/components/media/image-component.js";
import { VideoComponent } from "../pages/components/media/video-component.js";
import { HeadingComponent } from "../pages/components/text/heading-component.js";
import { MarkdownLoader } from "../pages/components/text/markdown-loader.js";
import { ParagraphComponent } from "../pages/components/text/paragraph-component.js";
import { PlainTextComponent } from "../pages/components/text/plain-text-component.js";
import { StyledTextComponent } from "../pages/components/text/styled-text-component.js";
import { GeneratedPage } from "../pages/generated-page.js";
import { HeaderSection } from "../pages/sections/header-section.js";
import { PaddedSection } from "../pages/sections/padded-section.js";
import { WebpageSection } from "../pages/sections/webpage-section.js";
import { WebsiteOptions } from "../website-options.js";

const fields = {
    resources: 'Resources',
    essayEmbed: 'Research Essay Embed',
    essayLink: 'Research Essay Link',
    video: 'Video Pitch',
    artwork: 'Artwork Description',
    creatorStatement: 'Creator Statement'
};

export class SimplePage extends GeneratedPage {
    constructor(private options: Partial<{ artwork: string[], header: { image: string, position: string, tint: string } }> = {}) {
        super();
    }

    async generateWebpage(): Promise<string> {
        const resources = this.getResources();

        const header = new HeaderSection();

        if (this.options.header) {
            header.setBackgroundImage(this.options.header.image, {
                backgroundPosition: this.options.header.position,
                backgroundTint: this.options.header.tint
            });
        }

        this.add(header);

        const overview = new PaddedSection();

        if (WebsiteOptions.simplePage.showCreatorStatementHeading) {
            overview.add(new HeadingComponent('Creator Statement'));
        } else {
            new MarginComponent()
        }
        
        overview.add(
            ...MarkdownLoader.load(resources.getContent(fields.creatorStatement) || `*Missing overview: Add property '${fields.creatorStatement}' in content.json*`),
            new MarginComponent()
        );

        overview.setSectionTheme(WebpageSection.Theme.AltLight);

        this.add(overview);
        
        const pitch = new PaddedSection();

        pitch.add(
            new MarginComponent(),
            new HeadingComponent('Video Pitch'),
            new VideoComponent(resources.getContent(fields.video) || "9xwazD5SyVg"),
            new MarginComponent()
        );

        const images: string[] = [];

        for (const file of this.options.artwork || []) {
            images.push(file);
        }

        if (this.options.artwork) {
            pitch.add(
                new HeadingComponent('Project Artwork')
            );

            if (resources.getContent(fields.artwork)) {
                pitch.add(...MarkdownLoader.load(resources.getContent(fields.artwork)));
            }

            pitch.add(
                new MarginComponent(),
                new GalleryComponent(images),
                new MarginComponent()
            );
        }

        pitch.setSectionTheme(WebpageSection.Theme.Dark);

        this.add(pitch);

        const essay = new PaddedSection(new HeadingComponent("Research Essay"));

        if (resources.getContent(fields.essayEmbed)) {
            essay.add(new DocumentComponent(resources.getContent(fields.essayEmbed), resources.getContent(fields.essayLink)));
        } else {
            essay.add(new ParagraphComponent(new StyledTextComponent("italic", new PlainTextComponent(`Missing essay: Add property '${fields.essayEmbed}' in content.json`))));
        }

        essay.add(new MarginComponent());

        this.add(essay);

        if (resources.getContent(fields.resources)) {
            const resourcesSection = new PaddedSection(
                new HeadingComponent("Resources"),
                ...MarkdownLoader.load(resources.getContent(fields.resources)),
                new MarginComponent()
            );

            resourcesSection.setSectionTheme(WebpageSection.Theme.AltLight);
        
            this.add(resourcesSection);
        }
        
        return await super.generateWebpage();
    }
}