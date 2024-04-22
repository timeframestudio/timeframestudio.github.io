import { canvas, ctx, mouse } from './world-map.js';

const pinImg = new Image();
pinImg.src = "/assets/pin.svg";

export default class MapPoint {
    static ALL = [];
    static PIN_SIZE = 50;

    constructor(project, projectPath) {
        this.project = project;
        this.x = project.location[0];
        this.y = project.location[1];
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
        ctx.arc(this.x, this.y, MapPoint.PIN_SIZE * 0.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        
        ctx.drawImage(pinImg, this.x - MapPoint.PIN_SIZE / 2, this.y - MapPoint.PIN_SIZE / 2, MapPoint.PIN_SIZE, MapPoint.PIN_SIZE);

        ctx.fillStyle = "#00000022";
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