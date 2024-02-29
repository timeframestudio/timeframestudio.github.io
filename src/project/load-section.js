import { DescriptionSection } from "./description-section.js";
import { HeaderSection } from "./header-section.js";
import { HeadingSection } from "./heading-section.js";
import { ImageSection } from "./image-section.js";
import { MarginSection } from "./margin-section.js";
import { PargraphSection } from "./paragraph-section.js";
import { RowSection } from "./row-section.js";
import { TintedSection } from "./tinted-section.js";

export async function loadSection(sectionData, project) {
    let section;
            
    if (sectionData.type == 'header') {
        section = new HeaderSection();
    } else if (sectionData.type == 'description') {
        section = new DescriptionSection();
    } else if (sectionData.type == 'row') {
        section = new RowSection();
    } else if (sectionData.type == 'image') {
        section = new ImageSection();
    } else if (sectionData.type == 'paragraph') {
        section = new PargraphSection();
    } else if (sectionData.type == 'heading') {
        section = new HeadingSection();
    } else if (sectionData.type == 'margin') {
        section = new MarginSection();
    } else if (sectionData.type == 'tint') {
        section = new TintedSection();
    } else {
        console.warn(`Unknown section type '${sectionData.type}'`);
        return;
    }

    await section.setup(sectionData, project);

    return section;
}