# API

The client can access the API through the `/api` route. It provides access to the project outlines to the search feature on all webpages.

## Endpoints

### `GET /api/projects`

Gets the outlines of all of the projects.

#### Reponse Format
```ts
{
    title: string,
    author: string,
    description: string,
    id: string,
    location: [ number, number ]
}[]
```