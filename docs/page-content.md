# Page Content

Each project can have a `content.json` file which stores the text for the project's pages. The content is stored in a JSON object with the name of the text as the key and the content as the value.

## Namespace: `PageContent`

The `PageContent` namespace is used to access the page content in the Discord bot code.

### Methods

#### `getProjectIds()`

Gets the IDs of all the projects.

##### Syntax

```ts
getProjectIds(): string[];
```

#### `getPageContent(projectId)`

Gets the content for a project's pages.

##### Syntax

```ts
getPageContent(projectId: string): { [key: string]: string };
```

#### `setPageContent(projectId, content)`
Sets the content for a project's pages asynchronously.

##### Syntax

```ts
setPageContent(projectId: string, content: { [key: string]: string }): Promise<void>;
```