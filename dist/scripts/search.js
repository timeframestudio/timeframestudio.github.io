import { getProjectSummaries } from "./projects.js";

document.addEventListener('DOMContentLoaded', () => {
    const searchBackground = document.querySelector('.search-popup-background');
    const searchPopup = document.querySelector('.search-popup');
    const searchClose = document.querySelector('.search-close-button');
    const searchBar = document.querySelector('.search-bar');
    const searchResults = document.querySelector('.search-results');
    const searchLink = document.querySelector('.search-link');

    searchBackground.addEventListener('click', event => {
        if (!searchPopup.contains(event.target) || event.target == searchClose) {
            hideSearchPopup();
        }
    });

    searchLink.addEventListener('click', event => {
        event.preventDefault();

        showSearchPopup();
    });

    document.addEventListener('keydown', event => {
        if (event.key == 'Escape') {
            event.preventDefault();
            
            hideSearchPopup();
        } else if (event.key == '/') {
            event.preventDefault();

            showSearchPopup();
        }
    });

    let hideTimeout = null;

    function showSearchPopup() {
        if (searchBackground.classList.contains('visible') && !hideTimeout) {
            return;
        }

        if (hideTimeout) {
            clearTimeout(hideTimeout);

            hideTimeout = null;
        }

        searchBackground.style.display = 'flex';

        searchBar.focus();
        updateResults();

        setTimeout(() => searchBackground.classList.add('visible'), 0);
    }

    function hideSearchPopup() {
        if (!searchBackground.classList.contains('visible') || hideTimeout) {
            return;
        }

        searchBackground.classList.remove('visible');
        searchBar.blur();
        searchBar.value = '';

        hideTimeout = setTimeout(() => {
            searchBackground.style.display = 'none';

            hideTimeout = null;
        }, 300);
    }

    searchBar.addEventListener('input', updateResults);

    async function updateResults() {
        let queryWords = searchBar.value.trim().toLowerCase().split(' ');

        for (let i = 0; i < queryWords.length; i++) {
            queryWords[i] = queryWords[i].replace(/[^a-z0-9]/g, '');
        }

        if (queryWords.length == 0) {
            showResults([]);
        } else {
            let summaries = await getProjectSummaries();
            let results = summaries.map(project => ({ project, score: 0 }));

            for (const word of queryWords) {
                for (const result of results) {
                    if (result.project.title.toLowerCase().includes(word)) {
                        result.score += 7;
                    }

                    if (result.project.author.toLowerCase().includes(word)) {
                        result.score += 5;
                    }

                    if (result.project.description.toLowerCase().includes(word)) {
                        result.score += 2;
                    }
                }
            }

            results = results.filter(result => result.score > 0);
            results.sort((a, b) => b.score - a.score);
            results = results.map(result => result.project);

            showResults(results);
        }
    }

    function showResults(results) {
        searchResults.innerHTML = '';

        if (results.length == 0) {
            const noResults = document.createElement('div');
            noResults.classList.add('search-no-results');
            noResults.textContent = 'No results found';
            searchResults.appendChild(noResults);
        } else {
            for (const result of results) {
                const resultElement = document.createElement('a');
                resultElement.classList.add('search-result');
                resultElement.href = result.url;

                const header = document.createElement('div');
                header.classList.add('search-result-header');

                const title = document.createElement('div');
                title.classList.add('search-result-title');
                title.textContent = result.title;
                header.appendChild(title);

                const author = document.createElement('div');
                author.classList.add('search-result-author');
                author.textContent = result.author;
                header.appendChild(author);

                resultElement.appendChild(header);

                let shortenedDescription = result.description;

                if (shortenedDescription.length > 200) {
                    shortenedDescription = shortenedDescription.substring(0, 200).trimEnd() + '...';
                }

                const description = document.createElement('div');
                description.classList.add('search-result-description');
                description.textContent = shortenedDescription;
                resultElement.appendChild(description);

                searchResults.appendChild(resultElement);
            }
        }
    }
});