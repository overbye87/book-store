import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { setIsAuthAction } from "../store/actions/user";
import styled from "styled-components";

import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from "../constants";

const NavBar: React.FC = () => {
  let navigate = useNavigate();
  const { isAuth, user } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Nav>
      <NavLink
        to={SHOP_ROUTE}
        className={({ isActive }) => (isActive ? "link link--active" : "link")}
      >
        Home
      </NavLink>
      {isAuth ? (
        <Nav>
          <img src={user ? process.env.REACT_APP_API_URL + user.img : ""}></img>
          <h2>Welcome {user ? user.name : "Stranger"}! &#128512;</h2>
          <NavLink
            className={({ isActive }) =>
              isActive ? "link link--active" : "link"
            }
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
        </Nav>
      ) : (
        <Nav>
          <NavLink
            className={({ isActive }) =>
              isActive ? "link link--active" : "link"
            }
            to={LOGIN_ROUTE}
          >
            Login
          </NavLink>
        </Nav>
      )}
    </Nav>
  );
};

export default NavBar;

const Nav = styled.nav`
  color: "darkslategray";
  height: 50px;
  //font-size: 1.2em;
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
      color: papayawhip;
      background-color: palevioletred;
    }
    :hover {
      background-color: darkslategray;
      color: papayawhip;
      border-color: darkslategray;
    }
  }
`;
