import { Position } from "../types/types";
import { Mixin } from "ts-mixer";

type drawTypes = "line" | "circle" | "rectangle";

interface drawingType {
  type: drawTypes;
  positions: {
    start: Position;
    end: Position;
  };
  lineDash: number[];
  lineColor: string | CanvasGradient | CanvasPattern;
  fillColor: string | CanvasGradient | CanvasPattern;
  lineWidth: number;
}

class CanvasBasis {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  click = {
    hold: false,

    positions: {
      start: { x: 0, y: 0 },
      end: { x: 0, y: 0 },
    },
  };

  hover = {
    positions: {
      previous: { x: 0, y: 0 },
    },
  };

  size: { width: number; height: number } = { width: 0, height: 0 };
  backgroundColor: string = "#ffffff";
  color: string | CanvasGradient | CanvasPattern = "#000000";
  isRedrawing = false;

  drawings: drawingType[] = [];

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  configLine(width: number, color: string | CanvasGradient | CanvasPattern) {
    this.ctx.lineWidth = width;
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    this.color = color;
  }

  saveHoverPrevious({ x, y }: Position) {
    this.hover.positions.previous = { x, y };
  }

  saveDraw(
    type: drawTypes,
    start = this.click.positions.start,
    end = this.click.positions.end
  ) {
    this.drawings.push({
      type,
      fillColor: this.ctx.strokeStyle,
      lineDash: this.ctx.getLineDash(),
      lineWidth: this.ctx.lineWidth,
      lineColor: this.ctx.strokeStyle,
      positions: {
        start,
        end,
      },
    });
  }
}

class CanvasTools extends CanvasBasis {
  deleteCanvas() {
    this.drawings = [];
    this.redrawCanvas();
  }

  private clearCanvas() {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.size.width, this.size.height);
    this.ctx.fillStyle = this.color;
  }

  private redrawCanvas() {
    const lineWidth = this.ctx.lineWidth;
    const lineColor = this.color;

    // Clear Canvas
    this.clearCanvas();

    // Redraw all objects
    this.drawings.forEach((draw) => {
      this.isRedrawing = true;
      this.ctx.setLineDash(draw.lineDash);
      this.configLine(draw.lineWidth, draw.lineColor);

      switch (draw.type) {
        case "line":
          this.drawStandardLine(draw.positions.end, draw.positions.start);
          break;
        case "circle":
          this.drawCircle(draw.positions.end, draw.positions.start);
          break;
        case "rectangle":
          this.drawRectangle(draw.positions.end, draw.positions.start);
          break;
      }
    });

    this.isRedrawing = false;
    this.configLine(lineWidth, lineColor);
  }

  eraser(current: Position) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.backgroundColor;
    this.ctx.setLineDash([]);
    this.drawStandardLine(current);
    this.ctx.closePath();

    this.ctx.strokeStyle = this.color;
    super.saveHoverPrevious(current);
  }

  drawStandardLine(current: Position, previous?: Position) {
    if (!previous) {
      super.saveDraw("line", current, this.hover.positions.previous);
    }

    if (this.ctx.getLineDash().length) {
      this.ctx.beginPath();
      this.drawStraightLine(previous, current);
      this.ctx.closePath();
    } else {
      this.ctx.beginPath();
      this.drawStraightLine(previous, current);
      this.drawCircleLine(current);
      this.ctx.closePath();
    }
  }

  drawStraightLine(
    previous = this.hover.positions.previous,
    { x, y }: Position
  ) {
    this.ctx.beginPath();
    this.ctx.moveTo(previous.x, previous.y);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.closePath();
    super.saveHoverPrevious({ x, y });
  }

  drawCircle(
    nowMouseOver: Position,
    initialPosition = this.click.positions.start
  ) {
    if (!this.isRedrawing) this.redrawCanvas();

    const ellipseSize = {
      width: Math.abs(initialPosition.x - nowMouseOver.x),
      height: Math.abs(initialPosition.y - nowMouseOver.y),
    };

    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();

    this.ctx.ellipse(
      initialPosition.x,
      initialPosition.y,
      ellipseSize.width,
      ellipseSize.height,
      0,
      0,
      2 * Math.PI
    );

    this.ctx.fill();
    this.ctx.closePath();

    if (!this.click.hold && !this.isRedrawing) super.saveDraw("circle");
    super.saveHoverPrevious(nowMouseOver);
  }

  drawRectangle(
    nowMouseOver: Position,
    initialPosition = this.click.positions.start
  ) {
    if (!this.isRedrawing) this.redrawCanvas();

    const rectSize = {
      width: -(initialPosition.x - nowMouseOver.x),
      height: -(initialPosition.y - nowMouseOver.y),
    };

    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();

    this.ctx.rect(
      initialPosition.x,
      initialPosition.y,
      rectSize.width,
      rectSize.height
    );

    this.ctx.fill();
    this.ctx.closePath();

    if (!this.click.hold && !this.isRedrawing) super.saveDraw("rectangle");
    super.saveHoverPrevious(nowMouseOver);
  }

  drawCircleLine({ x, y }: Position) {
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

    super.saveHoverPrevious({ x, y });
  }
}

class CanvasLineTypes extends CanvasBasis {
  setNormalLine() {
    this.ctx.setLineDash([]);
  }

  setDashedLine() {
    this.ctx.setLineDash([5]);
  }
}

export class Canvas extends Mixin(CanvasTools, CanvasLineTypes) {}
