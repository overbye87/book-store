import React from "react";
import styled from "styled-components";
import Messenger from "../components/Notification";

const Basket = () => {
  return (
    <Div>
      <div>
        <h3>Basket</h3>
      </div>
    </Div>
  );
};

export default Basket;

const Div = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  div {
    width: 500px;
  }
  h3 {
    font-size: 1.5em;
    color: palevioletred;
    text-align: center;
  }
`;
