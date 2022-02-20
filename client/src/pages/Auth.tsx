import { Email } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled as styledmui } from "@mui/material/styles";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { login, registration } from "../http/userAPI";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

type Inputs = {
  email: string;
  password: string;
  name: string;
};

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: "onBlur" });

  const signIn = async (email: string, password: string) => {
    const response = await login(email, password);
    console.log(response);
  };

  const registrationIn = async (
    email: string,
    password: string,
    name: string
  ) => {
    const response = await registration(email, password, name);
    console.log(response);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email, password, name } = data;
    //alert(JSON.stringify(data));

    //reset();
    if (isLogin) {
      signIn(email, password);
    } else {
      registrationIn(email, password, name);
    }
  };

  //console.log(watch("email")); // watch input value by passing the name of it
  //console.log(watch("password"));

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Item sx={{ minHeight: 500 }}>
          <Wrapper>
            <Card className="card_box--card">
              {isLogin ? <Title>Log in</Title> : <Title>Registration</Title>}
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Label>Email:</Label>
                <Input
                  type="email"
                  {...register("email", {
                    required: 'Field "email" cannot be empty',
                  })}
                />
                <Label>Password:</Label>
                <Input
                  type="password"
                  {...register("password", {
                    required: 'Field "Password" cannot be empty',
                    minLength: {
                      value: 3,
                      message: "Password must be longer than 3 characters",
                    },
                  })}
                />
                {!isLogin && <Label>Name</Label>}
                {!isLogin && (
                  <Input
                    {...register("name", {
                      required: 'Field "email" cannot be empty',
                    })}
                  />
                )}
                <br />
                {/* {errors.email && errors.password && <p>Fill in all the fields</p>} */}
                <Input
                  type="submit"
                  value={isLogin ? "Log in" : "Registration"}
                />
              </Form>
              <div>
                {isLogin ? (
                  <p>
                    Don't have an account?{" "}
                    <NavLink to={REGISTRATION_ROUTE}>
                      <Span>Register!</Span>
                    </NavLink>
                  </p>
                ) : (
                  <p>
                    Have an account?{" "}
                    <NavLink to={LOGIN_ROUTE}>
                      <Span>Log in!</Span>
                    </NavLink>
                  </p>
                )}
              </div>
              <div>
                {errors?.password && (
                  <p>
                    {errors?.password?.message || "Form filled out incorrectly"}
                  </p>
                )}

                {errors?.email && (
                  <p>
                    {errors?.email?.message || "Form filled out incorrectly"}
                  </p>
                )}
              </div>
            </Card>
          </Wrapper>
        </Item>
      </Grid>
    </Grid>
  );
};

export default Auth;

const Title = styled.h2`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
const Span = styled.span`
  color: palevioletred;
`;
const Wrapper = styled.section`
  font-size: 1.2em;
  display: flex;
  justify-content: center;
  align-items: top;
  //height: calc(100vh - 50px);
  .card_box {
    &--card {
    }
  }
`;
const Card = styled.div`
  width: 500px;
  padding: 1.5em;
  background: papayawhip;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: papayawhip;
`;
const Input = styled.input`
  padding: 0.5em;
  margin-top: 0.5em;
`;
const Label = styled.label`
  margin-top: 0.5em;
`;

const Item = styledmui(Paper)({
  color: "darkslategray",
  backgroundColor: "papayawhip",
  padding: 8,
  borderRadius: 4,
});
