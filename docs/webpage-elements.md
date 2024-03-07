# Webpage elements

Webpage elements are elements that can be added to a webpage's HTML code without any position or hierarchy. Webpage elements include:
 * [`Stylesheet`](#stylesheet) - Represents an external CSS stylesheet.
 * [`Script`](#script) - Represents an external JavaScript file.
 * [`Navigation`](#navigation) - Represents the navigation bar for a webpage. It does have a position, but it always appears at the top, so it's not treated as a component.
 * [`Footer`](#footer) - Represents the footer of a webpage. Like the `Navigation`, it always appears in the same place, so it's not considered a component.
 * [`Search`](#search) - Represents a search bar for a webpage and the hidden search menu.
 * [`StandardLayout`](#standardlayout) - Represents a standard layout for a webpage, including the header, footer, search bar, and some basic stylesheets.

## `Stylesheet`

Represents an external CSS stylesheet that will be imported in the head as a `<link type="text/css"/>` element.

### Constructor

Creates a new `Stylesheet` object with a given path.

```ts
new Stylesheet(path: string)
```

## `Script`

Represents an external JavaScript file that will be imported in the head or body.

### Constructor

Creates a new `Script` object with a given path and options. The options can include the type of the script (`text/javascript` or `module`), the location in the document, and whether the script is inserted before other script elements in the provided location.

```ts
new Script(path: string, options?: {
    type?: string,
    location?: string,
    preferred?: boolean
})
```

## `Navigation`

Represents the navigation bar for a webpage. It does have a position, but it always appears at the top, so it's not treated as a component.

### Constructor
```ts
new Navigation()
```

## `Footer`

Represents the footer of a webpage. Like the `Navigation`, it always appears in the same place, so it's not considered a component.

### Constructor

```ts
new Footer()
```

## `Search`

Represents a search bar for a webpage and the hidden search menu.

### Constructor

```ts
new Search()
```

## `StandardLayout`

Represents a standard layout for a webpage, including the header, footer, search bar, and some basic stylesheets.

### Constructor

Creates a new `StandardLayout` object with the given additional features:
 * `header` - Whether to include the stylesheet for a header.
 * `headings` - Whether to include the stylesheet for headings.
 * `margins` - Whether to include the stylesheet for margins.

```ts
constructor(additionalFeatures: {
    header?: boolean,
    headings?: boolean,
    margins?: boolean
})
```