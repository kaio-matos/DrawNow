import styled from "styled-components";

export const Button = styled.button`
  width: fit-content;
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
