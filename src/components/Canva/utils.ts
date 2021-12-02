import { Position } from "../../types/types";

export function getMousePositionRelativeTo(
  element: HTMLElement,
  clientPosition: Position
) {
  const rect = element.getBoundingClientRect();
  const x = clientPosition.x - rect.left; //x position within the element.
  const y = clientPosition.y - rect.top; //y position within the element.
  return { x, y };
}
