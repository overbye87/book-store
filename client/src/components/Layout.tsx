import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <Div>
      <Header />
      <NavBar />

      <Outlet />

      <Footer />
    </Div>
  );
};

export default Layout;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  gap: 5px;
`;
