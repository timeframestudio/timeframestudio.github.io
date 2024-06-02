function updateIframeSizes() {
    for (const slides of document.querySelectorAll('.slides-component')) {
        const iframe = slides.querySelector('iframe');

        iframe.style.height = `${slides.clientWidth * 569 / 960}px`;
    }
}

updateIframeSizes();

window.addEventListener('resize', updateIframeSizes);