import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Position } from "../types/types";
import { Canvas } from "./CanvasClass";

type CanvaContextData = {
  lineConfig: lineConfigType;
  setLineConfig: React.Dispatch<React.SetStateAction<lineConfigType>>;
  createCanvas: (canvasElement: HTMLCanvasElement) => void;
  screen: Canvas | undefined;
  registerEndPosition: (pos: Position) => void;
  registerStartPosition: (pos: Position) => void;
  registerPreviousPosition: (pos: Position) => void;
  clearScreen: () => void;
  switchTool: (tool: "brush" | "eraser") => void;
  draw: (pos: Position) => void;
};

type CanvaContextProviderProps = {
  children: ReactNode;
};

export type lineConfigType = {
  width: number;
  color: string;
  dashed: boolean;
};

export const CanvaContext = createContext({} as CanvaContextData);

export function CanvaContextProvider({ children }: CanvaContextProviderProps) {
  const [lineConfig, setLineConfig] = useState<lineConfigType>({
    width: 1,
    color: "black",
    dashed: false,
  });
  const [screen, setScreen] = useState<Canvas>();
  const [currentTool, setCurrentTool] = useState<"brush" | "eraser">("brush");

  useEffect(() => {
    screen?.configLine(lineConfig.width, lineConfig.color, lineConfig.dashed);
  }, [lineConfig]);

  function createCanvas(canvasElement: HTMLCanvasElement) {
    const ctx = canvasElement.getContext("2d");
    if (!ctx) return;

    const screen = new Canvas(ctx);
    setScreen(screen);
  }

  function registerStartPosition(pos: Position) {
    if (!screen) return;
    screen.startPosition = pos;
  }

  function registerEndPosition(pos: Position) {
    if (!screen) return;
    screen.endPosition = pos;
  }

  function registerPreviousPosition(pos: Position) {
    if (!screen) return;
    screen.savePreviousPosition(pos);
  }

  function clearScreen() {
    if (!screen) return;
    screen.clearCanvas();
  }

  function switchTool(tool: "brush" | "eraser") {
    setCurrentTool(tool);
  }

  function draw(pos: Position) {
    switch (currentTool) {
      case "brush":
        screen?.drawFreeLine(pos);
        break;
      case "eraser":
        screen?.eraser(pos);
        break;
      default:
        screen?.drawFreeLine(pos);
        break;
    }
  }

  return (
    <CanvaContext.Provider
      value={{
        lineConfig,
        setLineConfig,
        createCanvas,
        screen,
        registerEndPosition,
        registerStartPosition,
        registerPreviousPosition,
        clearScreen,
        switchTool,
        draw,
      }}
    >
      {children}
    </CanvaContext.Provider>
  );
}

export const useCanva = () => {
  return useContext(CanvaContext);
};
