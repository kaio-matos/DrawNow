export function getMousePositionRelativeTo(
  element: HTMLElement,
  clientX: number,
  clientY: number
) {
  const rect = element.getBoundingClientRect();
  const x = clientX - rect.left; //x position within the element.
  const y = clientY - rect.top; //y position within the element.
  return { x, y };
}
