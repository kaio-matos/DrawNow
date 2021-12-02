import { useEffect, useRef, useState } from "react";
import { useCanva } from "../../contexts/CanvaContext";
import { Canvas, CanvasContainer } from "./styles";
import { getMousePositionRelativeTo } from "./utils";

export default function Canva() {
  const [hold, setHold] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const canvasElement = useRef<HTMLCanvasElement>(null);
  const canvasContainerElement = useRef<HTMLDivElement>(null);
  const {
    screen,
    createCanvas,
    registerEndPosition,
    registerStartPosition,
    registerPreviousPosition,
  } = useCanva();

  function configResizeCanvas() {
    const container = canvasContainerElement.current;

    function resizeDiv() {
      if (container) {
        setSize({
          width: container.clientWidth,
          height: container.clientHeight,
        });
      }
    }

    resizeDiv();

    window.addEventListener("resize", resizeDiv);
    return () => window.removeEventListener("resize", resizeDiv);
  }

  function configCanvas() {
    if (!canvasElement.current) return;
    createCanvas(canvasElement.current);
  }

  useEffect(configResizeCanvas, []);
  useEffect(configCanvas, [canvasElement, size]);

  function StartClick(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    setHold(true);
    const currentPosition = getMousePositionRelativeTo(e.currentTarget, {
      x: e.clientX,
      y: e.clientY,
    });
    if (!screen) return;
    registerStartPosition(currentPosition);
    registerPreviousPosition(currentPosition);
  }

  function EndClick(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    setHold(false);
    const currentPosition = getMousePositionRelativeTo(e.currentTarget, {
      x: e.clientX,
      y: e.clientY,
    });
    registerEndPosition(currentPosition);
  }

  function HoldingClick(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    if (!hold) return;
    const canvas = e.currentTarget;
    const { x, y } = getMousePositionRelativeTo(canvas, {
      x: e.clientX,
      y: e.clientY,
    });

    screen?.drawFreeLine({ x, y });
  }

  return (
    <CanvasContainer ref={canvasContainerElement}>
      <Canvas
        ref={canvasElement}
        width={size.width}
        height={size.height}
        onMouseDown={StartClick}
        onMouseUp={EndClick}
        onMouseMove={HoldingClick}
      ></Canvas>
    </CanvasContainer>
  );
}
