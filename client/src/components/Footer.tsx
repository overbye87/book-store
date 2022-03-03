import React from "react";
import styled from "styled-components";

const Footer: React.FC = () => {
  return (
    <Div>
      <p>All rights reserved</p>
    </Div>
  );
};

export default Footer;

const Div = styled.div`
  height: 50px;
  padding: 5px;
  border-top: solid 3px black;
`;
