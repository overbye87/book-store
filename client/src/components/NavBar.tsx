import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { setIsAuthAction } from "../store/actions/user";

import { styled as styledMUI } from "@mui/material/styles";
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
          <NavLink
            to={SHOP_ROUTE}
            onClick={() => {
              dispatch(setIsAuthAction(false));
              localStorage.removeItem("accessToken");
            }}
            // style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Logout
          </NavLink>
          <NavLink
            to={ADMIN_ROUTE}
            // style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Admin
          </NavLink>
          <NavLink
            to={BASKET_ROUTE}
            // style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Basket
          </NavLink>
        </Stack>
      ) : (
        <Stack spacing={1} direction="row">
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

// const NavLink = styledMUI(Button)({
//   color: "darkslategray",
//   backgroundColor: "papayawhip",
//   padding: 8,
//   borderRadius: 4,
// });
