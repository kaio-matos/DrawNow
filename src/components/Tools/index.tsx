import Menu from "../Menu";
import { Button, Input } from "../BaseComponents";
import styled from "styled-components";
import { useCanva } from "../../contexts/CanvaContext";

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
  const { lineConfig, setLineConfig, clearScreen, switchTool } = useCanva();
  return (
    <ToolsContainer>
      <Menu
        label="Line"
        items={["normal", "dashed"]}
        onChange={(value) => {
          switchTool("brush");
          if (value === "dashed") {
            setLineConfig(({ width, color }) => {
              return { width, color, dashed: true };
            });
          } else {
            setLineConfig(({ width, color }) => {
              return { width, color, dashed: false };
            });
          }
        }}
      />
      <Button onClick={clearScreen}>Clear</Button>
      <Button
        onClick={() => {
          switchTool("eraser");
        }}
      >
        Eraser
      </Button>
      <Input
        type="color"
        onChange={(e) => {
          const color = e.currentTarget?.value;
          setLineConfig(({ width, dashed }) => {
            return { width, dashed, color };
          });
        }}
      />
      <Input
        type="number"
        defaultValue={lineConfig.width}
        onChange={(e) => {
          const width = Number(e.currentTarget?.value);
          setLineConfig(({ color, dashed }) => {
            return { width, dashed, color };
          });
        }}
      />
    </ToolsContainer>
  );
}
