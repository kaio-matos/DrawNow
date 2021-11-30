import { useEffect, useRef, useState } from "react";
import { Canvas } from "./styles";
import { getMousePositionRelativeTo, Screen } from "./utils";

export default function Canva() {
  const [hold, setHold] = useState(false);
  const [screen, setScreen] = useState<Screen>();
  const canvasElement = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasElement.current) return;

    const ctx = canvasElement.current.getContext("2d");
    if (!ctx) return;

    const screen = new Screen(ctx);
    screen.configLine(1, "#96ff92");
    setScreen(screen);
  }, [canvasElement]);

  function draw(x: number, y: number) {
    screen?.drawFreeLine({ x, y });
  }

  return (
    <div>
      <Canvas
        ref={canvasElement}
        width="500px"
        height="500px"
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
    </div>
  );
}
