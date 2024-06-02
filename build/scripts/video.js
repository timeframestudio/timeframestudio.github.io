function updateIframeSizes() {
    for (const video of document.querySelectorAll('.video-component')) {
        const iframe = video.querySelector('iframe');

        iframe.style.height = `${video.clientWidth * 543 / 966}px`;
    }
}

updateIframeSizes();

window.addEventListener('resize', updateIframeSizes);