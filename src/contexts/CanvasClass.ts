import { Position } from "../types/types";
import { Mixin } from "ts-mixer";

class CanvasBasis {
  ctx: CanvasRenderingContext2D;
  startPosition: Position = { x: 0, y: 0 };
  endPosition: Position = { x: 0, y: 0 };
  previousPosition: Position = { x: 0, y: 0 };
  size: { width: number; height: number } = { width: 0, height: 0 };
  backgroundColor: string = "#fff";
  color: string = "#000000";

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  configLine(width: number, color: string) {
    this.ctx.lineWidth = width;
    this.ctx.strokeStyle = color;
    this.color = color;
  }

  savePreviousPosition({ x, y }: Position) {
    this.previousPosition = { x, y };
  }
}

class CanvasTools extends CanvasBasis {
  clearCanvas() {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.size.width, this.size.height);
  }

  eraser({ x, y }: Position) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.backgroundColor;
    this.ctx.setLineDash([]);
    this.drawStandardLine({ x, y });
    this.ctx.closePath();

    this.ctx.strokeStyle = this.color;
    this.savePreviousPosition({ x, y });
  }

  drawStandardLine({ x, y }: Position) {
    if (this.ctx.getLineDash().length) {
      this.ctx.beginPath();
      this.drawFreeLine({ x, y });
      this.ctx.closePath();
    } else {
      this.ctx.beginPath();
      this.drawFreeLine({ x, y });
      this.drawCircle({ x, y });
      this.ctx.closePath();
    }
  }

  drawFreeLine({ x, y }: Position) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.previousPosition.x, this.previousPosition.y);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.closePath();
    this.savePreviousPosition({ x, y });
  }

  drawStraightLine() {
    this.ctx.moveTo(this.startPosition.x, this.startPosition.y);
    this.ctx.lineTo(this.endPosition.x, this.endPosition.y);
    this.ctx.stroke();
  }

  drawLightBeam(to: Position) {
    this.ctx.moveTo(this.startPosition.x, this.startPosition.y);
    this.ctx.lineTo(to.x, to.y);
    this.ctx.stroke();
  }

  drawCircle({ x, y }: Position) {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.ctx.strokeStyle;
    this.ctx.ellipse(
      x,
      y,
      this.ctx.lineWidth / 2,
      this.ctx.lineWidth / 2,
      0,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
    this.ctx.closePath();

    this.savePreviousPosition({ x, y });
  }

  drawRectangle({ x, y }: Position) {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.ctx.strokeStyle;
    this.ctx.rect(x, y, this.ctx.lineWidth, this.ctx.lineWidth);
    this.ctx.fill();
    this.ctx.closePath();

    this.savePreviousPosition({ x, y });
  }
}

class CanvasLineTypes extends CanvasBasis {
  setNormalLine() {
    this.ctx.setLineDash([]);
  }

  setDashedLine() {
    this.ctx.setLineDash([5, 15]);
  }
}

export class Canvas extends Mixin(CanvasTools, CanvasLineTypes) {}
