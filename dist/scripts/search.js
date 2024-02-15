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

    let hideTimeout = null;

    function showSearchPopup() {
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

                const title = document.createElement('div');
                title.classList.add('search-result-title');
                title.textContent = result.title;
                resultElement.appendChild(title);

                const description = document.createElement('div');
                description.classList.add('search-result-description');
                description.textContent = result.description;
                resultElement.appendChild(description);

                searchResults.appendChild(resultElement);
            }
        }
    }
});