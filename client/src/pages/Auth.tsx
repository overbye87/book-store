import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login, registration } from "../http/userAPI";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../constants";
import { useDispatch } from "react-redux";
import { setIsAuthAction, setUserAction } from "../store/actions/user";
import { useTypedSelector } from "../hooks/useTypedSelector";

type Inputs = {
  email: string;
  password: string;
  name: string;
};

const Auth = () => {
  const { isAuth, user } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { email, password, name } = data;
      if (isLogin) {
        var responseUser = await login(email, password);
      } else {
        var responseUser = await registration(email, password, name);
      }
      console.log(localStorage.getItem("accessToken"));
      console.log(responseUser);
      dispatch(setUserAction(responseUser));
      dispatch(setIsAuthAction(true));
      setTimeout(() => {
        navigate(SHOP_ROUTE, { replace: false });
      }, 2000);
    } catch (e: any) {
      alert(e.response.data.message);
    }
  };
  if (isAuth)
    return (
      <Div>
        <div>
          <h3>You are successfully authenticated!</h3>
        </div>
      </Div>
    );
  else
    return (
      <Div>
        <div>
          {isLogin ? <h3>Log in</h3> : <h3>Registration</h3>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Email:</label>
            <input
              type="email"
              {...register("email", {
                required: 'Field "email" cannot be empty',
              })}
            />
            <label>Password:</label>
            <input
              type="password"
              {...register("password", {
                required: 'Field "Password" cannot be empty',
                minLength: {
                  value: 3,
                  message: "Password must be longer than 3 characters",
                },
              })}
            />
            {!isLogin && <label>Name</label>}
            {!isLogin && (
              <input
                {...register("name", {
                  required: 'Field "name" cannot be empty',
                })}
              />
            )}
            {/* {errors.email && errors.password && <p>Fill in all the fields</p>} */}
            <input type="submit" value={isLogin ? "Log in" : "Registration"} />
          </form>
          <div>
            {isLogin ? (
              <p>
                Don't have an account?{" "}
                <NavLink to={REGISTRATION_ROUTE}>
                  <span>Register!</span>
                </NavLink>
              </p>
            ) : (
              <p>
                Have an account?{" "}
                <NavLink to={LOGIN_ROUTE}>
                  <span>Log in!</span>
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
              <p>{errors?.email?.message || "Form filled out incorrectly"}</p>
            )}
          </div>
        </div>
      </Div>
    );
};

export default Auth;

const Div = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  div {
    width: 500px;
  }
  h3 {
    font-size: 1.5em;
    color: palevioletred;
    text-align: center;
  }
  span {
    color: palevioletred;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  input {
    padding: 0.5em;
    margin-top: 0.5em;
  }
  label {
    margin-top: 0.5em;
  }
`;
