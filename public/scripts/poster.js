export function createPoster(projectSummary) {
    const wrapper = document.createElement('a');
    wrapper.href = `/projects/` + projectSummary.id;
    wrapper.classList.add('project-poster-wrapper');

    const poster = document.createElement('div');
    poster.classList.add('project-poster');

    if (projectSummary.poster) {
        poster.style.backgroundImage = `url(${projectSummary.poster})`;
        poster.style.backgroundSize = 'cover';
        poster.style.backgroundPosition = 'center';
    }
    
    if (!projectSummary.poster || projectSummary.posterText) {
        if (projectSummary.poster) poster.classList.add('project-poster-titled');
        else poster.classList.add('project-poster-title-only');

        const title = document.createElement('div');
        title.classList.add('project-poster-title');
        title.innerText = projectSummary.title;

        poster.appendChild(title);

        const author = document.createElement('div');
        author.classList.add('project-poster-author');
        author.innerText = projectSummary.author;

        poster.appendChild(author);
    }

    const overlay = document.createElement('div');
    overlay.classList.add('project-poster-overlay');

    const title = document.createElement('div');
    title.classList.add('project-poster-title');
    title.innerText = projectSummary.title;

    overlay.appendChild(title);

    const author = document.createElement('div');
    author.classList.add('project-poster-author');
    author.innerText = projectSummary.author;

    overlay.appendChild(author);

    poster.appendChild(overlay);

    wrapper.appendChild(poster);

    return wrapper;
}