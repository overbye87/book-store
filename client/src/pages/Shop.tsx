import React from "react";
import BookList from "../components/BookList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TypeBar from "../components/AuthorBar";
import GenreBar from "../components/GenreBar";
import Pages from "../components/PagesBar";

const Item = styled(Paper)({
  color: "darkslategray",
  backgroundColor: "papayawhip",
  padding: 8,
  borderRadius: 4,
});

const Shop = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={2}>
        <Item>
          <TypeBar />
        </Item>
      </Grid>
      <Grid item xs={2}>
        <Item>
          <GenreBar />
        </Item>
      </Grid>
      <Grid container item xs={8} spacing={1}>
        <Grid item xs={12}>
          <Item>
            <Pages />
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <BookList />
          </Item>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Shop;
