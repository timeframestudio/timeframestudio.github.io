import { canvas, ctx, mouse } from './world-map.js';

const pinImg = new Image();
pinImg.src = "/assets/pin-icon.jpeg"

export default class MapPoint {
    static ALL = [];
    static PIN_SIZE = 40;

    constructor(project) {
        this.project = project;
        this.x = project.position.x;
        this.y = project.position.y;

        MapPoint.ALL.push(this);
    }

    update() {
        this.draw();

        if (this.mouseOver()) {
            alert('hovered');
            this.onHover();
        }
    }

    draw() {
        ctx.drawImage(pinImg, this.x - MapPoint.PIN_SIZE / 2, this.y - MapPoint.PIN_SIZE / 2, MapPoint.PIN_SIZE, MapPoint.PIN_SIZE);
    }

    mouseOver() {
        if (mouse.x > this.x - MapPoint.PIN_SIZE / 2 && mouse.x < this.x + MapPoint.PIN_SIZE / 2 &&
            mouse.y > this.y - MapPoint.PIN_SIZE / 2 && mouse.y < this.y + MapPoint.PIN_SIZE / 2) {
            return true;
        }

        return false;
    }

    onHover() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
        ctx.fillRect(0, canvas.height - 100, canvas.clientWidth, 100);
    }
    
    onClick() {
        
    }
}