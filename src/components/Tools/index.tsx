import Menu from "../Menu";
import { Button } from "./styles";

export default function Tools() {
  return (
    <div>
      <Menu
        items={["normal", "dashed"]}
        onChange={(value) => {
          console.log(value);
        }}
      />
      <Button>Clear</Button>
      <Button>Eraser</Button>
      <Button>Colors</Button>
    </div>
  );
}
