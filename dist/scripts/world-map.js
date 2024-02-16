import MapPoint from './map-point.js'
import { getProjectSummaries } from './projects.js';

export const mouse = { x: 0, y: 0 };

export const canvas = document.getElementById("worldMap");
export const ctx = canvas.getContext('2d');

const worldMapImg = await loadImage("/assets/world-map.png");

canvas.width = worldMapImg.width;
canvas.height = worldMapImg.height;

ctx.drawImage(worldMapImg, 0, 0);

const projects = await getProjectSummaries();

loadMapPoints();

render();

function loadMapPoints() {
    for (const project of projects) {
        if (!project.position) {
            continue;
        }

        const point = new MapPoint(project);

        point.draw(ctx);
    }
}

async function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            resolve(img);
        };

        img.onerror = () => {
            reject(new Error(`Failed to load image: ${src}`));
        };

        img.src = src;
    });
}

canvas.addEventListener('mousemove', event => {
    mouse.x = event.offsetX / canvas.clientWidth * canvas.width;
    mouse.y = event.offsetY / canvas.clientHeight * canvas.height;

    canvas.style.cursor = 'default';

    for (const point of MapPoint.ALL) {
        point._isActivePoint = false;
    }

    let points = MapPoint.ALL.filter(point => point.isInMouseRange());

    if (points.length > 0) {
        canvas.style.cursor = 'pointer';

        points = points.sort((a, b) => a.getMouseDistance() - b.getMouseDistance());

        if (points.length > 0) {
            points[0]._isActivePoint = true;
        }
    }
});

canvas.addEventListener('click', event => {
    for (const point of MapPoint.ALL) {
        if (point.isActivePoint()) point.onClick();
    }
});

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(worldMapImg, 0, 0);

    for (const point of MapPoint.ALL) {
        point.draw();
    }

    requestAnimationFrame(render);
}