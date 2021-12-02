import { Position } from "../types/types";

export class Canvas {
  ctx: CanvasRenderingContext2D;
  startPosition: Position = { x: 0, y: 0 };
  endPosition: Position = { x: 0, y: 0 };
  previousPosition: Position = { x: 0, y: 0 };

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  configLine(width: number, color: string, dashed?: boolean) {
    this.ctx.lineWidth = width;
    this.ctx.strokeStyle = color;
    if (dashed) {
      this.ctx.setLineDash([5, 15]);
    } else {
      this.ctx.setLineDash([]);
    }
  }

  savePreviousPosition({ x, y }: Position) {
    this.previousPosition = { x, y };
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
}
