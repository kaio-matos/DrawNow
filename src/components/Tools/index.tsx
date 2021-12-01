import Menu from "../Menu";
import { Button, Input } from "../BaseComponents";
import styled from "styled-components";

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
  return (
    <ToolsContainer>
      <Menu
        label="Line"
        items={["normal", "dashed"]}
        onChange={(value) => {
          console.log(value);
        }}
      />
      <Button>Clear</Button>
      <Button>Eraser</Button>
      <Input type="color" />
    </ToolsContainer>
  );
}
