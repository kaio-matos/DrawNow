import { useState } from "react";
import { Canvas } from "./styles";
import { getMousePositionRelativeTo } from "./utils";

export default function Canva() {
  const [hold, setHold] = useState(false);
  const [previousPosition, setPreviousPosition] = useState({ x: 0, y: 0 });

  function draw(x: number, y: number, canvas: HTMLCanvasElement) {
    const color = "#96ff92";
    const width = 4;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineWidth = width;
    ctx.strokeStyle = color;

    ctx.moveTo(previousPosition.x, previousPosition.y);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function changePreviousPosition(x: number, y: number) {
    if (previousPosition.x !== x || previousPosition.y !== y) {
      setPreviousPosition({ x, y });
    }
  }

  return (
    <div>
      <Canvas
        width="500px"
        height="500px"
        onMouseDown={(e) => {
          setHold(true);
          setPreviousPosition(
            getMousePositionRelativeTo(e.currentTarget, e.clientX, e.clientY)
          );
        }}
        onMouseUp={(e) => {
          setHold(false);
        }}
        onMouseMove={(e) => {
          if (!hold) return;
          const canvas = e.currentTarget;
          const { x, y } = getMousePositionRelativeTo(
            canvas,
            e.clientX,
            e.clientY
          );

          changePreviousPosition(x, y);
          draw(x, y, canvas);
        }}
      ></Canvas>
    </div>
  );
}
