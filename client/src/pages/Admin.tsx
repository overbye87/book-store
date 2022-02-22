import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type DataChangeInputs = {
  email: string;
  name: string;
  img: string;
};

type PasswordChangeInputs = {
  oldPassword: string;
  newPassword: string;
};

const Admin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<DataChangeInputs>({ mode: "onBlur" });

  const onSubmitDataChange: SubmitHandler<DataChangeInputs> = async (data) => {
    try {
      const { email, name, img } = data;
      //const responseUser = await userDataChange(email, name, img);
      //dispatch(setUserAction(responseUser));
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <Item sx={{ minHeight: 500 }}>
          <h2>Change user data</h2>
        </Item>
      </Grid>
      <Grid item xs={6}>
        <Item sx={{ minHeight: 500 }}>
          <h2>Change user password</h2>
        </Item>
      </Grid>
    </Grid>
  );
};

export default Admin;

const Item = styled(Paper)({
  color: "darkslategray",
  backgroundColor: "papayawhip",
  padding: 8,
  borderRadius: 4,
});
