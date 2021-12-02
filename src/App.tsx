import styled from "styled-components";
import Canva from "./components/Canva";
import Header from "./components/Header";
import Tools from "./components/Tools";
import { CanvaContextProvider } from "./contexts/CanvaContext";

function App() {
  const Container = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100vh;
  `;

  return (
    <Container>
      <Header />
      <CanvaContextProvider>
        <Canva />
        <Tools />
      </CanvaContextProvider>
    </Container>
  );
}

export default App;
