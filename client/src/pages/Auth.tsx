import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login, registration } from "../http/userAPI";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAuthAction,
  setIsAuthAndUserAction,
  setUserAction,
} from "../store/actions/user";
import { RootState } from "../store/redusers";

type Inputs = {
  email: string;
  password: string;
  name: string;
};

const Auth = () => {
  const [loginError, setLoginError] = useState("");
  const { isAuth, user } = useSelector((state: RootState) => state.user);
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
      let responseUser = null;
      if (isLogin) {
        responseUser = await login(email, password);
      } else {
        responseUser = await registration(email, password, name);
      }
      dispatch(setIsAuthAndUserAction(true, responseUser));
      setTimeout(() => {
        navigate(-1);
        //navigate(SHOP_ROUTE, { replace: false });
      }, 1000);
    } catch (e: any) {
      setLoginError(e.response.data.message);
    }
  };
  if (isAuth)
    return (
      <Div>
        <div className="container">
          <h3>You are successfully authenticated!</h3>
        </div>
      </Div>
    );
  else
    return (
      <Div>
        <div className="container">
          {isLogin ? <h3>Log in</h3> : <h3>Registration</h3>}
          <form className="flex" onSubmit={handleSubmit(onSubmit)}>
            <label>Email:</label>
            <input
              type="email"
              {...register("email", {
                required: 'Field "Email" cannot be empty',
              })}
            />
            <div className="errors">
              {errors?.email && (
                <p>{errors?.email?.message || "Form filled out incorrectly"}</p>
              )}
            </div>
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
            <div className="errors">
              {errors?.password && (
                <p>
                  {errors?.password?.message || "Form filled out incorrectly"}
                </p>
              )}
            </div>

            {!isLogin && (
              <div className="flex">
                <label>Name:</label>
                <input
                  {...register("name", {
                    required: 'Field "Name" cannot be empty',
                  })}
                />
                <div className="errors">
                  {errors?.name && (
                    <p>
                      {errors?.name?.message || "Form filled out incorrectly"}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* {errors.email && errors.password && <p>Fill in all the fields</p>} */}
            <input type="submit" value={isLogin ? "Log in" : "Registration"} />
            <div className="errors">
              {loginError && isLogin && <p>Log in error: {loginError}</p>}
            </div>
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
  .container {
    width: 500px;
    h3 {
      font-size: 1.5em;
      color: palevioletred;
      text-align: center;
    }
    .flex {
      display: flex;
      flex-direction: column;
    }
    .errors {
      height: 50px;
      color: palevioletred;
    }
    span {
      color: palevioletred;
    }
    input {
      margin: 10px 0;
      padding: 10px 15px;
      border: 2px solid gray;
      border-radius: 5px;
      font-size: 1em;
    }
    label {
      margin-top: 0.5em;
    }
    input[type="submit"] {
      border: 2px solid palevioletred;
      background-color: white;
      cursor: pointer;
      :hover {
        background-color: gray;
        color: white;
        border-color: gray;
      }
    }
  }
`;
