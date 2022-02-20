import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import React from "react";

const Item = styled(Paper)({
  color: "darkslategray",
  backgroundColor: "papayawhip",
  padding: 8,
  borderRadius: 4,
});

const Basket = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <Item sx={{ minHeight: 500 }}>
          <h2>Basket</h2>
        </Item>
      </Grid>
      <Grid item xs={6}>
        <Item sx={{ minHeight: 500 }}></Item>
      </Grid>
    </Grid>
  );
};

export default Basket;
