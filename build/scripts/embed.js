function updateIframeSizes() {
    for (const embed of document.querySelectorAll('.embed-component')) {
        const iframe = embed.querySelector('iframe');

        if (embed.hasAttribute('data-adaptive')) {
            iframe.style.width = '100%';
        }

        if (embed.hasAttribute('data-aspect')) {
            const height = iframe.clientWidth / Number(embed.getAttribute('data-aspect'));

            iframe.style.height = `${height}px`;
        }
    }
}

updateIframeSizes();

window.addEventListener('resize', updateIframeSizes);