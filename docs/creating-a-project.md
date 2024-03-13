## **Step 1 of 5:** Copy the template
Copy `content/projects/bob/` to a new folder named based on the project author's <u>first name</u>. Only lowercase a-z and dashes are allowed.

## **Step 2 of 5:** Edit the metadata
Open `project.json` and edit the metadata to match the new project:

 * `title`: The title of the project.
 * `author`: The author of the project's <u>full name</u>.
 * `description`: A short description of the project.
 * `location`: The location of the project on the map, in the form of `[ <x-position>, <y-position> ]`.

## **Step 3 of 5:** Create the layout
Open `index.ts` and create the layout out of sections and components, using page content with markdown whenever possible.

### List of page sections

**`HeaderSection`:** A section at the top of the page that adds the header. *We want this in all project home pages!*

**`PaddedSection`:** A section with some padding, which can contain components.

### List of common components

**`ImageComponent`:** A component that displays an image.

**`RowComponent`:** A component that displays multiple `ItemComponent`s horizontally.

**`MarginComponent`:** A component that adds a margin of 32px.

**`ParagraphComponent`:** A component that displays a paragraph of text.

### Using markdown from `content.json`

To load markdown from a value in content.json file:

```ts
const pageContent = this.getResources().getPageContent();
const sectionContent = pageContent['section name'];
const section = new PaddedSection(
    ...MarkdownLoader.load(sectionContent)
);

this.addPageSections(section);
```

## **Step 4 of 5:** Add a base page content
Edit the JSON file at `content.json` to include the initial text for the project, which should explain which section it is on the page.

```json
{
    "section name": "This is the initial text for the section.",
    "another section": "This is the initial text for another section."
}
```

## **Step 5 of 5:** Restart the enviroment to view the new project
Restart the `npm run build` command to finish setting up the new project. When you change the `content.json` or `project.json` file, you need to rerun the `npm start` command to see the changes.