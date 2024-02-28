import { canvas, ctx, mouse } from './world-map.js';

const pinImg = new Image();
pinImg.src = "/assets/pin-icon.jpeg"

export default class MapPoint {
    static ALL = [];
    static PIN_SIZE = 40;

    constructor(project, projectPath) {
        this.project = project;
        this.x = project.position.x;
        this.y = project.position.y;
        this._hoverEffect = 0;
        this._isActivePoint = false;
        this.projectPath = projectPath;

        MapPoint.ALL.push(this);
    }

    update() {
        this.draw();
    }

    draw() {
        if (this._isActivePoint) {
            this._hoverEffect = Math.min(1, this._hoverEffect + 0.2);
        } else {
            this._hoverEffect = Math.max(0, this._hoverEffect - 0.2);
        }

        ctx.fillStyle = "#00000022";
        ctx.globalAlpha = this._hoverEffect;
        ctx.beginPath();
        ctx.arc(this.x, this.y, MapPoint.PIN_SIZE, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        
        ctx.drawImage(pinImg, this.x - MapPoint.PIN_SIZE / 2, this.y - MapPoint.PIN_SIZE / 2, MapPoint.PIN_SIZE, MapPoint.PIN_SIZE);
    }

    getMouseDistance() {
        return Math.hypot(this.x - mouse.x, this.y - mouse.y);
    }

    isInMouseRange() {
        return this.getMouseDistance() < MapPoint.PIN_SIZE;
    }

    isActivePoint() {
        return this._isActivePoint;
    }
    
    onClick() {
        window.location.pathname = this.projectPath;
    }
}