let searchBackground, searchLink, searchPopup, searchClose;
let hideTimeout = null;

function showSearchPopup() {
    if (hideTimeout) {
        clearTimeout(hideTimeout);

        hideTimeout = null;
    }

    searchBackground.style.display = 'flex';
    setTimeout(() => searchBackground.classList.add('visible'), 0);
}

function hideSearchPopup() {
    searchBackground.classList.remove('visible');

    hideTimeout = setTimeout(() => {
        searchBackground.style.display = 'none';

        hideTimeout = null;
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    searchBackground = document.querySelector('.search-popup-background');
    searchPopup = document.querySelector('.search-popup');
    searchClose = document.querySelector('.search-close-button');

    searchBackground.addEventListener('click', event => {
        if (!searchPopup.contains(event.target) || event.target == searchClose) {
            hideSearchPopup();
        }
    });

    searchLink = document.querySelector('.search-link');

    searchLink.addEventListener('click', event => {
        event.preventDefault();

        showSearchPopup();
    });
});