import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { styled as styledMUI } from "@mui/material/styles";

interface DataChangeInputs {
  email: string;
  name: string;
  img: string;
}
interface PasswordChangeInputs {
  oldPassword: string;
  newPassword: string;
}

const Admin = () => {
  const {
    register: registerData,
    handleSubmit: handleSubmitData,
    reset: resetData,
    formState: { errors: errorsData, isValid: isValidData },
  } = useForm<DataChangeInputs>({ mode: "onBlur" });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: errorsPassword, isValid: isValidPassword },
  } = useForm<PasswordChangeInputs>({ mode: "onBlur" });

  const onSubmitDataChange: SubmitHandler<DataChangeInputs> = async (data) => {
    try {
      const { email, name, img } = data;
      //const responseUser = await userDataChange(email, name, img);
      //dispatch(setUserDataAction(responseUser));
      console.log({ email, name, img });
      //resetData();
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  const onSubmitPasswordChange: SubmitHandler<PasswordChangeInputs> = async (
    data
  ) => {
    try {
      const { oldPassword, newPassword } = data;
      //const responseUser = await userPasswordChange(oldPassword, newPassword);
      //dispatch(setUserPasswordAction(responseUser));
      console.log({ oldPassword, newPassword });
      //resetPassword();
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <Item sx={{ minHeight: 500 }}>
          <Wrapper>
            <h2>Change user data</h2>
            <div className="card">
              <form key={1} onSubmit={handleSubmitData(onSubmitDataChange)}>
                <label>Email:</label>
                <input
                  type="email"
                  {...registerData("email", {
                    required: 'Field "email" cannot be empty',
                  })}
                ></input>

                <label>Name:</label>
                <input
                  {...registerData("name", {
                    required: 'Field "name" cannot be empty',
                  })}
                ></input>

                <label>Img:</label>
                <input
                  {...registerData("img", {
                    required: 'Field "img" cannot be empty',
                  })}
                ></input>

                <input type="submit" value={"change"}></input>
              </form>
            </div>
          </Wrapper>
        </Item>
      </Grid>
      <Grid item xs={6}>
        <Item sx={{ minHeight: 500 }}>
          <Wrapper>
            <h2>Change user password</h2>
            <div className="card">
              <form
                key={2}
                onSubmit={handleSubmitPassword(onSubmitPasswordChange)}
              >
                <label>Old password</label>
                <input
                  type="password"
                  {...registerPassword("oldPassword", {
                    required: 'Field "old password" cannot be empty',
                  })}
                ></input>

                <label>New password</label>
                <input
                  type="password"
                  {...registerPassword("newPassword", {
                    required: 'Field "new password" cannot be empty',
                  })}
                ></input>

                <input type="submit" value={"change"}></input>
              </form>
            </div>
          </Wrapper>
        </Item>
      </Grid>
    </Grid>
  );
};

export default Admin;

const Wrapper = styled.section`
  font-size: 1.2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  //justify-content: center;
  align-items: top;
  //height: calc(100vh - 50px);
  .card {
    width: 400px;
    padding: 1.5em;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  label {
    margin-top: 0.5em;
  }
  input {
    box-sizing: border-box;
    width: 100%;
    padding: 0.5em;
    margin-top: 0.5em;
  }
  input[type="submit"] {
  }
`;

const Item = styledMUI(Paper)({
  color: "darkslategray",
  backgroundColor: "papayawhip",
  padding: 8,
  borderRadius: 4,
});
