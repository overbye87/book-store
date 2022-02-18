import React from "react";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";

import AppRouter from "./components/AppRouter";

const AppWrapper = styled.div`
  font-family: sans-serif;
`;

const App = () => {
  return (
    <AppWrapper>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppWrapper>
  );
};

export default App;
