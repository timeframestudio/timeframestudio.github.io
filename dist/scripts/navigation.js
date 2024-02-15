document.addEventListener('scroll', () => {
    const navBar = document.querySelector('.navigation-bar');

    if (window.scrollY > 0) {
        navBar.classList.add('navigation-bar-shadowed');
    } else {
        navBar.classList.remove('navigation-bar-shadowed');
    }
});