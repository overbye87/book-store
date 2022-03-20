import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setIsAuthAction } from "../store/actions/user";
import styled from "styled-components";

import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  DEFAULT_AVATAR_FILENAME,
  DEFAULT_AVATAR_URL,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from "../constants";
import Notification from "./Notification";
import { RootState } from "../store/redusers";

const NavBar: React.FC = () => {
  const { isAuth, user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  if (isAuth) {
    return (
      <div>
        <Nav>
          <NavLink
            to={SHOP_ROUTE}
            className={({ isActive }) =>
              isActive ? "link link--active" : "link"
            }
          >
            Home
          </NavLink>
          <img
            src={
              user
                ? user.img
                  ? process.env.REACT_APP_API_URL + user.img
                  : DEFAULT_AVATAR_URL
                : ""
            }
          ></img>
          <h2>Welcome {user ? user.name : "Stranger"}! &#128512;</h2>
          <NavLink
            className={"link"}
            to={SHOP_ROUTE}
            onClick={() => {
              dispatch(setIsAuthAction(false));
              localStorage.removeItem("accessToken");
            }}
          >
            Logout
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "link link--active" : "link"
            }
            to={ADMIN_ROUTE}
          >
            Admin
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "link link--active" : "link"
            }
            to={BASKET_ROUTE}
          >
            Basket
          </NavLink>
          <Notification />
        </Nav>
      </div>
    );
  }
  return (
    <Nav>
      <NavLink
        to={SHOP_ROUTE}
        className={({ isActive }) => (isActive ? "link link--active" : "link")}
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "link link--active" : "link")}
        to={LOGIN_ROUTE}
      >
        Login
      </NavLink>
    </Nav>
  );
};

export default NavBar;

const Nav = styled.nav`
  height: 50px;
  padding: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  img {
    height: 50px;
    border-radius: 50%;
  }
  .link {
    text-decoration: none;
    border: 2px solid palevioletred;
    padding: 10px 15px;
    border-radius: 5px;
    &--active {
      color: white;
      background-color: palevioletred;
    }
    :hover {
      background-color: gray;
      color: white;
      border-color: gray;
    }
  }
`;
