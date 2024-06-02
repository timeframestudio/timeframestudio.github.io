import { openSearchPopup } from "./search.js";

for (const element of document.querySelectorAll('.not-found-search')) {
    element.addEventListener('click', event => {
        openSearchPopup();
    });
}