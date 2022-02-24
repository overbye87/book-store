import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { setIsAuthAction } from "../store/actions/user";

import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";

import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "../constants";

const NavBar: React.FC = () => {
  let navigate = useNavigate();
  const { isAuth, user } = useTypedSelector((state) => state.user);
  //let isAuth = true;
  //console.log(isAuth);

  const dispatch = useDispatch();

  let activeStyle = {
    textDecoration: "underline",
  };

  return (
    <Stack spacing={1} direction="row">
      {/* <Button
        onClick={() => {
          navigate(SHOP_ROUTE, { replace: false });
        }}
        variant="outlined"
      >
        Home
      </Button> */}
      <NavLink
        to={SHOP_ROUTE}
        // style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Home
      </NavLink>
      {isAuth ? (
        <Stack spacing={1} direction="row">
          <img
            style={{ borderRadius: "50%" }}
            height={50}
            src={user ? process.env.REACT_APP_API_URL + user.img : ""}
          ></img>
          <h2>Welcome {user ? user.name : "Stranger"}! &#128512;</h2>
          {/* <Button
            onClick={() => {
              dispatch(setIsAuthAction(false));
              localStorage.removeItem("accessToken");
              navigate(SHOP_ROUTE, { replace: false });
            }}
            variant="outlined"
          >
            Logout
          </Button> */}
          <NavLink
            to={SHOP_ROUTE}
            onClick={() => {
              dispatch(setIsAuthAction(false));
              localStorage.removeItem("accessToken");
              //navigate(SHOP_ROUTE, { replace: false });
            }}
            // style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Logout
          </NavLink>
          {/* <Button
            onClick={() => {
              navigate(ADMIN_ROUTE, { replace: false });
            }}
            variant="outlined"
          >
            Admin
          </Button> */}
          <NavLink
            to={ADMIN_ROUTE}
            // style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Admin
          </NavLink>
          {/* <Button
            onClick={() => {
              navigate(BASKET_ROUTE, { replace: false });
            }}
            variant="outlined"
          >
            Basket
          </Button> */}
          <NavLink
            to={BASKET_ROUTE}
            // style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Basket
          </NavLink>
        </Stack>
      ) : (
        <Stack spacing={1} direction="row">
          {/* <Button
            onClick={() => {
              navigate(LOGIN_ROUTE, { replace: false });
            }}
            variant="outlined"
          >
            Login
          </Button> */}
          <NavLink
            to={LOGIN_ROUTE}
            // style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Login
          </NavLink>
        </Stack>
      )}
    </Stack>
  );
};

export default NavBar;
