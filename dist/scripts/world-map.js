import MapPoint from './map-point.js'
import { getProjectSummaries } from './projects.js';

const canvas = document.getElementById("worldMap");
const ctx = canvas.getContext('2d');

const worldMapImg = await loadImage("/assets/world-map.png");

canvas.width = worldMapImg.width;
canvas.height = worldMapImg.height;

ctx.drawImage(worldMapImg, 0, 0);

const projects = await getProjectSummaries();

loadMapPoints();

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