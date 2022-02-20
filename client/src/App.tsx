import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";

import AppRouter from "./components/AppRouter";

const AppWrapper = styled.div`
  font-family: sans-serif;
`;

// type IBook = {
//   id: number;
//   name: string;
// };

const App = () => {
  //
  //   const [state, setState] = useState<IBook[]>([]);

  //   useEffect(() => {
  //     const foo = async () => {
  //       try {
  //         const responce = await axios.get("http://localhost:4000/api/book");
  //         setState(responce.data);
  //       } catch (e) {
  //         console.log("ERROR FROM", e);
  //       }
  //     };
  //     foo();
  //   }, []);

  return (
    <AppWrapper>
      {/* {state.map((book) => {
        return <h1 key={book.id}>{book.name}</h1>;
      })} */}
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppWrapper>
  );
};

export default App;
