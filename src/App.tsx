import styled from "styled-components";
import Canva from "./components/Canva";
import Header from "./components/Header";
import Tools from "./components/Tools";

function App() {
  const Container = styled.div`
    display: grid;
    grid-template-rows: auto 1fr auto;
    height: 100vh;
  `;

  return (
    <Container>
      <Header />
      <Canva />
      <Tools />
    </Container>
  );
}

export default App;
