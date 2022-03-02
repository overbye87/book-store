import { Grid, Paper } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";
import styled from "styled-components";
import { styled as styledMUI } from "@mui/material/styles";

const Layout = () => {
  return (
    <div>
      <Grid container spacing={1} direction="column" sx={{ height: "100vh" }}>
        <Grid item>
          <Item>
            <Header />
          </Item>
        </Grid>

        <Grid item>
          <Item>
            <NavBar />
          </Item>
        </Grid>

        <Grid item sx={{ flexGrow: 1 }}>
          <Outlet />
        </Grid>

        <Grid item>
          <Item>
            <Footer />
          </Item>
        </Grid>
      </Grid>
      {/* <Container>
        <div className="item">asd</div>
        <div className="item item--grow">asd</div>
        <div className="item">asd</div>
      </Container> */}
    </div>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  .item {
    height: 100px;
    background-color: aqua;
    &--grow {
      background-color: red;
      flex-grow: 1;
    }
  }
`;

const Item = styledMUI(Paper)({
  color: "darkslategray",
  backgroundColor: "papayawhip",
  padding: 8,
  borderRadius: 4,
});
