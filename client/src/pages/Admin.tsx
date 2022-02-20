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

const Admin = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Item sx={{ minHeight: 500 }}>
          <h2>Admin</h2>
        </Item>
      </Grid>
    </Grid>
  );
};

export default Admin;
