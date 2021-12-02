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
    createCanvas,
    screen,
    registerEndPosition,
    registerStartPosition,
    registerPreviousPosition,
    draw,
  } = useCanva();

  function configResizeCanvas() {
    const container = canvasContainerElement.current;

    function resizeDiv() {
      if (container) {
        const currentSize = {
          width: container.clientWidth,
          height: container.clientHeight,
        };
        setSize(currentSize);

        if (!screen) return;
        screen.size = currentSize;
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

  useEffect(configResizeCanvas, [screen]);
  useEffect(configCanvas, [canvasElement]);

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

    draw({ x, y });
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
