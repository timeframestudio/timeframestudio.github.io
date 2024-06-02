import { createPoster } from './poster.js';
import { getProjectSummaries } from './projects.js';
import './world-map.js';

function addListItems(items) {
    const grid = document.querySelector(".project-poster-grid");

    for (const item of items) {
        const poster = createPoster(item);
        grid.appendChild(poster);
    }

    return grid;
}

const summaries = await getProjectSummaries();

addListItems(summaries);