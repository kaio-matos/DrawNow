export interface Position {
  x: number;
  y: number;
}

export function getMousePositionRelativeTo(
  element: HTMLElement,
  clientPosition: Position
) {
  const rect = element.getBoundingClientRect();
  const x = clientPosition.x - rect.left; //x position within the element.
  const y = clientPosition.y - rect.top; //y position within the element.
  return { x, y };
}

export class Screen {
  ctx: CanvasRenderingContext2D;
  startPosition: Position = { x: 0, y: 0 };
  endPosition: Position = { x: 0, y: 0 };
  previousPosition: Position = { x: 0, y: 0 };

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  configLine(width: number, color: string) {
    this.ctx.lineWidth = width;
    this.ctx.strokeStyle = color;
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
