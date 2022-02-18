import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

type Inputs = {
  email: string;
  password: string;
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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    alert(JSON.stringify(data));
    reset();
  };

  //console.log(watch("email")); // watch input value by passing the name of it
  //console.log(watch("password"));

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
    height: calc(100vh - 50px);
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

  return (
    <Wrapper>
      <Card>
        {isLogin ? <Title>Authorization</Title> : <Title>Registration</Title>}
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

          {/* {errors.email && errors.password && <p>Fill in all the fields</p>} */}

          <Input type="submit" value="Login" />
        </Form>
        <div>
          <p>
            Don't have an account?{" "}
            <NavLink to={REGISTRATION_ROUTE}>
              <Span>Register!</Span>
            </NavLink>
          </p>
        </div>
        <div>
          {errors?.password && (
            <p>{errors?.password?.message || "Form filled out incorrectly"}</p>
          )}

          {errors?.email && (
            <p>{errors?.email?.message || "Form filled out incorrectly"}</p>
          )}
        </div>
      </Card>
    </Wrapper>
  );
};

export default Auth;
