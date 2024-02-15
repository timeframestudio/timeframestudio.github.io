import MapPoint from './map-point.js'

const canvas = document.getElementById("worldMap");
const ctx = canvas.getContext('2d');

const worldMapImg = new Image();

worldMapImg.onload = event => {

    canvas.width = worldMapImg.width;
    canvas.height = worldMapImg.height;
    ctx.drawImage(worldMapImg, 0, 0);
};

worldMapImg.src = "/assets/world-map.png";

let projects;


// Some get functions that may be useful
function getProjectByTitle(title) {
    for (const project in projects) {
        if (projects[project].title == title) {
            return projects[project];
        }
    }

    console.log(`No project found with title '${title}'!`);
}

function getProjectByAuthor(author) {
    for (const project in projects) {
        if (projects[project].author == author) {
            return projects[project];
        }
    }

    console.log(`No project found with author ${author}!`);
}

$.get("/assets/json/projects.json", function(res) {
    projects = res;
    loadMapPoints();
});

function loadMapPoints() {
    for (let i in projects) {
        const proj = projects[i];
        const newMapPoint = new MapPoint(getProjectByTitle("The Sheep of Afghanistan"));
        newMapPoint.draw(ctx);
    }
}