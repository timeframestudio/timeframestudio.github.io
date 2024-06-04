import { canvas, ctx, mouse } from './world-map.js';

const pinImg = new Image();
pinImg.src = "/assets/pin.svg";

export default class MapPoint {
    static ALL = [];
    static PIN_SIZE = 50;
    static PADDING_SIZE = 20;
    static FONT_SIZE = 30;
    static ROUNDING = 10;
    static LINE_GAP = 12;

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
    }

    drawTooltip() {
        ctx.globalAlpha = this._hoverEffect;

        ctx.font = "600 " + MapPoint.FONT_SIZE + "px Roboto";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";

        const titleMetrics = ctx.measureText(this.project.title);
        
        ctx.font = MapPoint.FONT_SIZE + "px Roboto";
        
        const authorMetrics = ctx.measureText(this.project.author);

        const totalHeight = titleMetrics.actualBoundingBoxAscent + titleMetrics.actualBoundingBoxDescent + authorMetrics.actualBoundingBoxAscent + authorMetrics.actualBoundingBoxDescent + MapPoint.PADDING_SIZE * 2 + MapPoint.LINE_GAP;
        const totalWidth = Math.max(titleMetrics.width, authorMetrics.width) + MapPoint.PADDING_SIZE * 2;

        ctx.fillStyle = "#00000088";
        ctx.beginPath();
        ctx.roundRect(this.x + MapPoint.PIN_SIZE * 0.8 + MapPoint.PADDING_SIZE, this.y - totalHeight / 2, totalWidth, totalHeight, MapPoint.ROUNDING);
        ctx.fill();

        ctx.fillStyle = "#ffffffdd";
        ctx.font = "600 " + MapPoint.FONT_SIZE + "px Roboto";

        ctx.fillText(this.project.title, this.x + MapPoint.PIN_SIZE * 0.8 + MapPoint.PADDING_SIZE * 2, this.y - titleMetrics.actualBoundingBoxDescent - MapPoint.LINE_GAP / 2);

        ctx.font = MapPoint.FONT_SIZE + "px Roboto";

        ctx.fillText(this.project.author, this.x + MapPoint.PIN_SIZE * 0.8 + MapPoint.PADDING_SIZE * 2, this.y + authorMetrics.actualBoundingBoxAscent + MapPoint.LINE_GAP / 2);

        ctx.globalAlpha = 1;
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