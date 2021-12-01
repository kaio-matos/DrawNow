import { useState } from "react";
import styled from "styled-components";

interface MenuProps {
  items: string[];
  onChange: (value: string) => void;
}

const Button = styled.button`
  background-color: palevioletred;
  border: none;
  padding: 1em;
  transition: 350ms;
  cursor: pointer;

  &:hover {
    background-color: #b8486d;
    color: #fff;
  }
`;

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

export default function Menu({ items, onChange }: MenuProps) {
  const [open, setOpen] = useState(false);

  function toggleMenu() {
    setOpen(!open);
  }

  return (
    <MenuContainer>
      <Button onClick={toggleMenu}>Label</Button>

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
