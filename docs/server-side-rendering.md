# Server Side Rendering

Server Side Rendering (SSR) is the process of generating a web page on the server and sending the HTML code to the client. On the website, SSR is based around the `Webpage` interface, which represents a webpage that can be asynchronously loaded on the server.

## Interface: `Webpage`

The `Webpage` interface represents a webpage that can be asynchronously generated on the server and sent as responses to GET requests.

### Methods

#### `setupWebpage()`

The `setupWebpage()` method is called when the server starts and should be used to load any data that the webpage needs to render and generate the HTML code.

##### Syntax
```ts
async setupWebpage(): Promise<void>
```

#### `getPageHTML()`

Gets the HTML code for the webpage. This method may be called very often and should probably just return a cached version of the HTML code.

##### Syntax
```ts
getPageHTML(): string
```

#### `getRouteHandler()`

Gets the Express route handler for the webpage. This method is used to handle requests for the webpage.

##### Syntax
```ts
getRouteHandler(): (req: express.Request, res: express.Response) => void
```

## Caching the HTML code

The HTML code for the webpage should be cached to avoid generating it on every request. The `getPageHTML()` method should return the cached HTML code. The `CachedWebpage` class can be used to cache the HTML code and handle the routing for the webpage.

## Class: `CachedWebpage`

> **Implements**: `Webpage`

The `CachedWebpage` class is an abstract implementation of the `Webpage` interface that caches the HTML code and handles the routing for the webpage. It implements all the methods of the `Webpage` interface but requires the `generateWebpage()` method to be implemented in subclasses.

### Constructor

#### `constructor()`

Creates a new `CachedWebpage` object.

### Abstract Methods

#### `generateWebpage()`

Generates and returns the HTML code for the webpage. This method should be implemented in subclasses.

##### Syntax
```ts
async generateWebpage(): Promise<string>
```

## Examples of basic usage

Some simple examples found in the code using the `CachedWebpage` class:

 * [`HomePage`](../src/server/pages/home-page.ts) - The website home page.
 * [`AboutPage`](../src/server/pages/about-page.ts) - The website about page at `/about`.

These examples use code defined in HTML files and add `StandardLayout`s to the pages.

## Webpage elements

`WebpageElement` objects represent elements on a webpage without a place in the hierarchy, such as stylesheets, scripts, and the navigation bar. They can be added to a webpage's HTML code using the `add()` method.

## Interface: `WebpageElement`

The `WebpageElement` interface represents an element on a webpage that can be added to the webpage's HTML code.

### Methods

#### `add(document: Document)`
Adds the element to the webpage's HTML code.

## A `StandardLayout` in the home page

In the `HomePage` class, a `StandardLayout` is added to the page in the `generateWebpage()` method and a `Script` is added to make the world map interactive.

```ts
const layout = new StandardLayout({
    header: true,
    headings: true,
    margins: true
});

layout.add(dom.window.document);

const worldMap = new Script('/scripts/world-map.js', { location: 'body' });
worldMap.add(dom.window.document);
```

The `StandardLayout` class is a `WebpageElement` that contains other webpage elements. By default, it adds the navigation, footer, search bar, and some basic stylesheets to the webpage. It takes in an object with the following properties:
 * `header` - Whether to add stylesheets for page headers to the webpage.
 * `headings` - Whether to add stylesheets for headings to the webpage.
 * `margins` - Whether to add stylesheets for margins to the webpage.

> For more information on webpage elements, see the [Webpage Elements](./webpage-elements.md) page.