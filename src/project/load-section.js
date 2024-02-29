import { DescriptionSection } from "./sections/description-section.js";
import { HeaderSection } from "./sections/header-section.js";
import { HeadingSection } from "./sections/heading-section.js";
import { ImageSection } from "./sections/image-section.js";
import { MarginSection } from "./sections/margin-section.js";
import { PargraphSection } from "./sections/paragraph-section.js";
import { RowSection } from "./sections/row-section.js";
import { TintedSection } from "./sections/tinted-section.js";

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