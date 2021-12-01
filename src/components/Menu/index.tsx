import { useState } from "react";
import styled from "styled-components";
import { Button, Selector } from "../BaseComponents";

interface MenuProps {
  items: string[];
  label: string;
  onChange: (value: string) => void;
}

const MenuContainer = styled.div`
  position: relative;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 100%;
  pointer-events: none;

  opacity: 0;
  transition: opacity 250ms;

  &.active {
    pointer-events: auto;
    opacity: 1;
  }
`;

export default function Menu({ label, items, onChange }: MenuProps) {
  const [open, setOpen] = useState(false);

  function toggleMenu() {
    setOpen(!open);
  }

  return (
    <MenuContainer>
      <Selector onClick={toggleMenu}>{label}</Selector>

      <OptionsContainer className={open ? "active" : ""}>
        {items.map((item) => (
          <Button
            key={item}
            onClick={() => {
              toggleMenu();
              onChange(item);
            }}
          >
            {item}
          </Button>
        ))}
      </OptionsContainer>
    </MenuContainer>
  );
}
