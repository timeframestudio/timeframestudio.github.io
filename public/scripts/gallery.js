let currentImage = null;

for (const image of document.querySelectorAll('.image-gallery-image')) {
    image.addEventListener('click', event => {
        event.preventDefault();

        currentImage = image;

        showImage(image.src);
    });
}

function showImage(url) {
    const container = document.createElement('div');
    container.classList.add('image-gallery-overlay-container');

    const image = document.createElement('img');
    image.src = url;
    image.classList.add('image-gallery-overlay-image');

    container.appendChild(image);

    const overlay = document.createElement('div');
    overlay.classList.add('image-gallery-overlay');
    overlay.addEventListener('click', hideImage);

    container.appendChild(overlay);

    const close = document.createElement('img');
    close.classList.add('image-gallery-overlay-close');
    close.src = '/assets/close-white.svg';
    close.addEventListener('click', hideImage);

    container.appendChild(close);

    document.body.appendChild(container);
}

function hideImage() {
    document.querySelector('.image-gallery-overlay-container').remove();
}