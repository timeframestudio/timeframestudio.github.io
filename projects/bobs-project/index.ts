import express from "express";
import { ProjectPage } from "../../src/server/project/project-page.js";
import { HeaderSection } from "../../src/server/project/sections/header-section.js";
import { ProjectPageRouter } from "../../src/server/project/project-page-router.js";

class MainPage extends ProjectPage {
    async setupWebpage() {
        this.addPageSections(new HeaderSection());

        await super.setupWebpage();
    }
};

const mainPage = new MainPage();

const router = new ProjectPageRouter();

router.addPage("/", mainPage);

export default router;