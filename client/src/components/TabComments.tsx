import React from "react";
import styled from "styled-components";

const TabComments = () => {
  return (
    <Div>
      <h2>Comments</h2>
    </Div>
  );
};

export default TabComments;

const Div = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  //align-items: center;
  justify-content: flex-start;

  h2 {
    font-size: 2em;
    color: palevioletred;
  }

  .card__description {
    font-size: 1.1em;
    text-indent: 1.5em;
  }
`;
