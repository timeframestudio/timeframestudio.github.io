import { DescriptionSection } from "./description-section.js";
import { HeaderSection } from "./header-section.js";
import { RowSection } from "./row-section.js";

export async function loadSection(sectionData, project) {
    let section;
            
    if (sectionData.type == 'header') {
        section = new HeaderSection();
    } else if (sectionData.type == 'description') {
        section = new DescriptionSection();
    } else if (sectionData.type == 'row') {
        section = new RowSection();
    } else {
        console.warn(`Unknown section type '${data.type}'`);
        return;
    }

    await section.setup(sectionData, project);

    return section;
}