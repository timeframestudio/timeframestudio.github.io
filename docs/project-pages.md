# Project Pages

A project page is a webpage that displays information about a project. All project pages should extend from `ProjectPage` and replace the `generateWebpage()` method, calling the superclass method at the end.

Project pages are defined in the `index.ts` file of the project's directory. The `index.ts` file should export (default) a `ProjectPageRouter` object, which can contain multiple project pages under different route paths.

## Creating a Project Page

To create a project page, create a new TypeScript file in the project directory called `index.ts`, then define a class that extends `ProjectPage`. The class should implement the `generateWebpage()` method, which should add *webpage sections*.

```ts
class MyProjectPage extends ProjectPage {
    async generateWebpage(): Promise<string> {
        this.addPageSections(new HeaderSection());
        
        return await super.generateWebpage();
    }
}
```

Webpage sections are objects that represent different sections of the webpage, which are stacked vertically. They can be added to the webpage using the `addPageSections()` method. The two subclasses of `WebpageSection` are `HeaderSection` (the header at the top of the page) and `PaddedSection` (a section with content aligned to the center).

## Adding the Project Page to the Router

After creating the project page, add it to the `ProjectPageRouter` object and export it from the `index.ts` file.

```ts
const router = new ProjectPageRouter();

router.addPage('/my-page', new MyProjectPage());

export default router;
```

## Adding Components to the Project Page

*Webpage components* are objects that represent elements on a webpage with a hierarchy. They can be passed into the `PaddedSection` constructor. Webpage components include:
 * `HeadingComponent` - Represents a heading on a webpage.
 * `ImageComponent` - Represents an image with a caption on a webpage.
 * `MarginComponent` - Represents a margin on a webpage.
 * `RowComponent` - Represents a row of components on a webpage.
 * `ItemComponent` - Represents a single item in a row on a webpage.
 * `ParagraphComponent` - Represents a paragraph of text on a webpage.

For example, to add a heading and a paragraph to a `PaddedSection`:

```ts
class MyProjectPage extends ProjectPage {
    async generateWebpage(): Promise<string> {
        this.addPageSections(new PaddedSection([
            new HeadingComponent('My Project'),
            new ParagraphComponent(
                new PlainTextToken('This is a project page.')
            )
        ]));
        
        return await super.generateWebpage();
    }
}
```

## Rich Text in Paragraphs

Those with eyes may have noticed that the `ParagraphComponent` constructor is taking in a `PlainTextToken` object. This is because the `ParagraphComponent` constructor can take in multiple `RichTextToken` objects of various types:
 * `PlainTextToken` - Represents plain text.
 * `StyledTextToken` - Represents bold or italic text.
 * `LinkToken` - Represents a link to another webpage.
 * `ListTextToken` - Represents a bulleted or numbered list.
 * `ListItemTextToken` - Represents a single item in a list.

In the future, there will probably be a utility to convert Markdown to `RichTextToken` objects.

## Full Example

Here is a full example of a project page incorporating many of the above concepts:

```ts
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
```