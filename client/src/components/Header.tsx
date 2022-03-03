import React from "react";
import styled from "styled-components";

const Header: React.FC = () => {
  return (
    <Div>
      <h1>Book - Store</h1>
    </Div>
  );
};

export default Header;

const Div = styled.div`
  height: 50px;
  padding: 5px;
  border-bottom: solid 3px black;
`;
