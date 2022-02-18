import React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";

import { NavLink } from "react-router-dom";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "../utils/consts";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { setIsAuthAction } from "../store/actions/user";
import { useDispatch } from "react-redux";

const NavBar: React.FC = () => {
  const { isAuth } = useTypedSelector((state) => state.user);
  console.log(isAuth);

  const dispatch = useDispatch();
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button
              onClick={() => {
                dispatch(setIsAuthAction(true));
              }}
              color="inherit"
            >
              set isAuth to true
            </Button>
            <Button
              onClick={() => {
                dispatch(setIsAuthAction(false));
              }}
              color="inherit"
            >
              set isAuth to false
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <nav>
        <ul>
          <li>
            <NavLink to={SHOP_ROUTE}>Shop</NavLink>
          </li>

          {isAuth ? (
            <div>
              <li>
                <NavLink to={ADMIN_ROUTE}>Admin</NavLink>
              </li>
              <li>
                <NavLink to={LOGIN_ROUTE}>Logout</NavLink>
              </li>
              <li>
                <NavLink to={BASKET_ROUTE}>Basket</NavLink>
              </li>
            </div>
          ) : (
            <div>
              <li>
                <NavLink to={LOGIN_ROUTE}>Login</NavLink>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
