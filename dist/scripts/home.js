import './world-map.js';
import './navigation.js';
import { getProjectSummaries } from './projects.js';

function addListItems(items) {
    const rowContainer = document.getElementById("rowContainer");

    for (let rowNumber = 0; rowNumber < Math.ceil(items.length / 3); rowNumber++) {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.flexWrap = 'wrap';
        row.style.padding = '8px';
        row.style.width = '100%';

        for (let i = 0; i < 3; i++) {
            const item = document.createElement('a');
            item.style.textDecoration = 'none';
            item.style.color = '#444444';
            item.style.display = 'block';
            
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