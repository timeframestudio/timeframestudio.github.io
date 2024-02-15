import './world-map.js';
import './main.js';
import { getProjectSummaries } from './projects.js';

function addListItems(items) {
    const rowContainer = document.getElementById("rowContainer");

    for (let rowNumber = 0; rowNumber < Math.ceil(items.length / 3); rowNumber++) {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.flexWrap = 'wrap';
        row.style.width = '100%';

        if (rowNumber != 0) row.style.marginTop = '16px';
        if (rowNumber != Math.ceil(items.length / 3) - 1) row.style.marginBottom = '16px';

        for (let i = 0; i < 3; i++) {
            const item = document.createElement('a');

            if (i != 0) item.style.marginLeft = '16px';
            if (i != 2) item.style.marginRight = '16px';

            if (items[i + rowNumber * 3] !== undefined) {
                item.style.padding = '16px';

                const title = document.createElement('div');
                title.style.fontWeight = 'bold';
                title.style.marginBottom = '8px';
                title.innerText = items[i + rowNumber * 3].title;

                item.appendChild(title);

                const author = document.createElement('div');
                author.style.color = '#666666';
                author.style.marginBottom = '8px';
                author.style.fontStyle = 'italic';
                author.innerText = items[i + rowNumber * 3].author;

                item.appendChild(author);

                const description = document.createElement('div');  
                description.style.color = '#666666';

                let shortenedDescription = items[i + rowNumber * 3].description;

                if (shortenedDescription.length > 200) {
                    shortenedDescription = shortenedDescription.substring(0, 200).trimEnd() + '...';
                }

                description.innerText = shortenedDescription;

                item.appendChild(description);

                item.classList.add('project-item');

                item.href = `/projects/${items[i + rowNumber * 3].id}`;
            } else {
                item.classList.add('project-blank');
            }

            row.appendChild(item);
        }

        rowContainer.appendChild(row);
    }
}

const summaries = await getProjectSummaries();

addListItems(summaries);