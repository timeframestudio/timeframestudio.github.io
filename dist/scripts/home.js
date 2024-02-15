import './world-map.js';
import './navigation.js';

document.addEventListener('scroll', () => {
    const navBar = document.getElementById('navigationBar');

    if (window.scrollY > 0) {
        navBar.classList.add('navigation-bar-shadowed');
    } else {
        navBar.classList.remove('navigation-bar-shadowed');
    }
});