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
} from "../utils/consts";

const NavLink2 = styled(Button)({
  color: "darkslategray",
  backgroundColor: "papayawhip",
  padding: 8,
  borderRadius: 4,
});

const NavBar: React.FC = () => {
  let navigate = useNavigate();
  const { isAuth } = useTypedSelector((state) => state.user);
  //let isAuth = true;
  //console.log(isAuth);

  const dispatch = useDispatch();
  return (
    <Stack spacing={1} direction="row">
      <Button
        onClick={() => {
          navigate(SHOP_ROUTE, { replace: false });
        }}
        variant="outlined"
      >
        Home
      </Button>
      {isAuth ? (
        <Stack spacing={1} direction="row">
          <Button
            onClick={() => {
              dispatch(setIsAuthAction(false));
              navigate(SHOP_ROUTE, { replace: false });
            }}
            variant="outlined"
          >
            Logout
          </Button>
          <Button
            onClick={() => {
              navigate(ADMIN_ROUTE, { replace: false });
            }}
            variant="outlined"
          >
            Admin
          </Button>

          <Button
            onClick={() => {
              navigate(BASKET_ROUTE, { replace: false });
            }}
            variant="outlined"
          >
            Basket
          </Button>
        </Stack>
      ) : (
        <Stack spacing={1} direction="row">
          <Button
            onClick={() => {
              navigate(LOGIN_ROUTE, { replace: false });
            }}
            variant="outlined"
          >
            Login
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default NavBar;
