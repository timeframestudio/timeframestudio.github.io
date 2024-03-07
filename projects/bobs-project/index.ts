import { HeadingComponent } from "../../src/server/project/components/heading-component.js";
import { ProjectPageRouter } from "../../src/server/project/project-page-router.js";
import { ProjectPage } from "../../src/server/project/project-page.js";
import { LinkTextToken } from "../../src/server/project/rich-text/link-text-token.js";
import { ListItemTextToken } from "../../src/server/project/rich-text/list-item-text-token.js";
import { ListTextToken } from "../../src/server/project/rich-text/list-text-token.js";
import { ParagraphComponent } from "../../src/server/project/rich-text/paragraph-component.js";
import { PlainTextToken } from "../../src/server/project/rich-text/plain-text-token.js";
import { StyledTextToken } from "../../src/server/project/rich-text/styled-text-token.js";
import { HeaderSection } from "../../src/server/project/sections/header-section.js";
import { PaddedSection } from "../../src/server/project/sections/padded-section.js";

class MainPage extends ProjectPage {
    async generateWebpage(): Promise<string> {
        this.addPageSections(new HeaderSection());
        this.addPageSections(new PaddedSection(
            new HeadingComponent('Bob\'s Project'),
            new ParagraphComponent(
                new PlainTextToken('This projects is about '),
                new StyledTextToken('bold', new PlainTextToken('cats')),
                new PlainTextToken(' becuse they are '),
                new StyledTextToken('italic', new PlainTextToken('cool')),
                new PlainTextToken('. '),
                new LinkTextToken('Learn more!', 'https://en.wikipedia.org/wiki/Cat')
            ),
            new HeadingComponent('Tutorial: Befriending a cat'),
            new ParagraphComponent(
                new PlainTextToken('To befriend a cat, you need to follow these steps:'),
                new ListTextToken("ordered",
                    new ListItemTextToken(new PlainTextToken("Find a cat")),
                    new ListItemTextToken(new PlainTextToken("Approach the cat")),
                    new ListItemTextToken(new PlainTextToken("Pet the cat")),
                    new ListItemTextToken(new PlainTextToken("Feed the cat")),
                    new ListItemTextToken(new PlainTextToken("Adopt the cat"))
                )
            )
        ));
        
        return await super.generateWebpage();
    }
}

const router = new ProjectPageRouter();

router.addPage('/', new MainPage());

export default router;