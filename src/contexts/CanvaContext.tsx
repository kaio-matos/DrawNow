import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Position, LineTypes, ToolTypes } from "../types/types";
import { Canvas } from "./CanvasClass";

type CanvaContextData = {
  lineConfig: lineConfigType;
  setLineConfig: React.Dispatch<React.SetStateAction<lineConfigType>>;
  createCanvas: (canvasElement: HTMLCanvasElement) => void;
  screen: Canvas | undefined;
  clearScreen: () => void;
  switchLineType: (lineType: LineTypes) => void;
  switchTool: (tool: ToolTypes) => void;
  currentTool: ToolTypes;
  draw: (pos: Position) => void;
};

type CanvaContextProviderProps = {
  children: ReactNode;
};

export type lineConfigType = {
  width: number;
  color: string;
};

export const CanvaContext = createContext({} as CanvaContextData);

export function CanvaContextProvider({ children }: CanvaContextProviderProps) {
  const [lineConfig, setLineConfig] = useState<lineConfigType>({
    width: 10,
    color: "black",
  });
  const [screen, setScreen] = useState<Canvas>();
  const [currentLineType, setCurrentLineType] = useState<LineTypes>("normal");
  const [currentTool, setCurrentTool] = useState<ToolTypes>("brush");

  useEffect(() => {
    screen?.configLine(lineConfig.width, lineConfig.color);
  }, [screen, lineConfig]);

  function createCanvas(canvasElement: HTMLCanvasElement) {
    const ctx = canvasElement.getContext("2d");
    if (!ctx) return;

    const screen = new Canvas(canvasElement, ctx);
    setScreen(screen);
  }

  function clearScreen() {
    if (!screen) return;
    screen.deleteCanvas();
  }

  function switchLineType(lineType: LineTypes) {
    setCurrentLineType(lineType);
  }

  function switchTool(tool: ToolTypes) {
    setCurrentTool(tool);
  }

  function draw(pos: Position) {
    switch (currentLineType) {
      case "normal":
        screen?.setNormalLine();
        break;
      case "dashed":
        screen?.setDashedLine();
        break;
      default:
        screen?.setNormalLine();
        break;
    }

    switch (currentTool) {
      case "brush":
        screen?.drawStandardLine(pos);
        break;
      case "eraser":
        screen?.eraser(pos);
        break;
      case "circle":
        screen?.drawCircle(pos);
        break;
      case "rectangle":
        screen?.drawRectangle(pos);
        break;
      default:
        screen?.drawStandardLine(pos);
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
        clearScreen,
        switchLineType,
        switchTool,
        currentTool,
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
