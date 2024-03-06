import { HeadingComponent } from "../../src/server/project/components/heading-component.js";
import { ProjectPageRouter } from "../../src/server/project/project-page-router.js";
import { ProjectPage } from "../../src/server/project/project-page.js";
import { ParagraphComponent } from "../../src/server/project/rich-text/paragraph-component.js";
import { PlainTextToken } from "../../src/server/project/rich-text/plain-text-token.js";
import { StyledTextToken } from "../../src/server/project/rich-text/styled-text-token.js";
import { HeaderSection } from "../../src/server/project/sections/header-section.js";
import { PaddedSection } from "../../src/server/project/sections/padded-section.js";

class MainPage extends ProjectPage {
    async setupWebpage() {
        this.addPageSections(new HeaderSection());
        this.addPageSections(new PaddedSection(
            new HeadingComponent("Welcome to Bob's Project", 1),
            new ParagraphComponent(
                new PlainTextToken("This is a project that Bob made. It's pretty "),
                new StyledTextToken("bold", new PlainTextToken("cool")),
                new PlainTextToken(" if you ask me.")
            )
        ));

        await super.setupWebpage();
    }
};

const mainPage = new MainPage();

const router = new ProjectPageRouter();

router.addPage("/", mainPage);

export default router;