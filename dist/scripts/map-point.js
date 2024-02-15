export default class MapPoint {
    static ALL = [];
    constructor(project) {
        this.project = project;
        this.x = project.pos.x;
        this.y = project.pos.y;

        MapPoint.ALL.push(this);
    }

    draw(ctx) {
        // Testing if the points display on the map, will change to actual image later
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(this.x, this.y, 10, 10);
    }

    onHover() {

    }

    onClick() {

    }
}