import { useEffect, useRef, useState } from "react";
import { Canvas, CanvasContainer } from "./styles";
import { getMousePositionRelativeTo, Screen } from "./utils";

export default function Canva() {
  const [hold, setHold] = useState(false);
  const [screen, setScreen] = useState<Screen>();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const canvasElement = useRef<HTMLCanvasElement>(null);
  const canvasContainerElement = useRef<HTMLDivElement>(null);

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

    const ctx = canvasElement.current.getContext("2d");
    if (!ctx) return;

    const screen = new Screen(ctx);
    screen.configLine(1, "#96ff92");
    setScreen(screen);
  }

  useEffect(configResizeCanvas, []);
  useEffect(configCanvas, [canvasElement, size]);

  function draw(x: number, y: number) {
    screen?.drawFreeLine({ x, y });
  }

  return (
    <CanvasContainer ref={canvasContainerElement}>
      <Canvas
        ref={canvasElement}
        width={size.width}
        height={size.height}
        onMouseDown={(e) => {
          setHold(true);
          const currentPosition = getMousePositionRelativeTo(e.currentTarget, {
            x: e.clientX,
            y: e.clientY,
          });
          if (!screen) return;
          screen.startPosition = currentPosition;
          screen.savePreviousPosition(currentPosition);
        }}
        onMouseUp={(e) => {
          setHold(false);
          const currentPosition = getMousePositionRelativeTo(e.currentTarget, {
            x: e.clientX,
            y: e.clientY,
          });
          if (!screen) return;
          screen.endPosition = currentPosition;
        }}
        onMouseMove={(e) => {
          if (!hold) return;
          const canvas = e.currentTarget;
          const { x, y } = getMousePositionRelativeTo(canvas, {
            x: e.clientX,
            y: e.clientY,
          });

          draw(x, y);
        }}
      ></Canvas>
    </CanvasContainer>
  );
}
