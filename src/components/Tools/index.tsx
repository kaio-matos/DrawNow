import Menu from "../Menu";
import { Button, Input } from "../BaseComponents";
import styled from "styled-components";
import { useCanva } from "../../contexts/CanvaContext";
import { LineTypes, ToolTypes } from "../../types/types";

const ToolsContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;

  & button,
  & input {
    height: 3rem;
  }
`;

export default function Tools() {
  const { lineConfig, setLineConfig, clearScreen, switchLineType, switchTool } =
    useCanva();
  return (
    <ToolsContainer>
      <Menu
        label="Line"
        items={["normal", "dashed"]}
        onChange={(value) => {
          switchLineType(value as LineTypes);
        }}
      />
      <Menu
        label="Tools"
        items={["brush", "eraser", "circle", "rectangle"]}
        onChange={(value) => {
          switchTool(value as ToolTypes);
        }}
      />
      <Button onClick={clearScreen}>Clear</Button>
      <Input
        type="color"
        onChange={(e) => {
          const color = e.currentTarget?.value;
          setLineConfig(({ width }) => {
            return { width, color };
          });
        }}
      />
      <Input
        type="number"
        defaultValue={lineConfig.width}
        min={1}
        onChange={(e) => {
          const width = Number(e.currentTarget?.value);
          setLineConfig(({ color }) => {
            return { width, color };
          });
        }}
      />
    </ToolsContainer>
  );
}
