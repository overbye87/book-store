import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Admin from "../pages/Admin";
import Auth from "../pages/Auth";
import Basket from "../pages/Basket";
import BookPage from "../pages/BookPage";
import Shop from "../pages/Shop";
import styled, { createGlobalStyle } from "styled-components";

import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  BOOK_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "../constants";

import Layout from "./Layout";
import { useSelector } from "react-redux";
import { RootState } from "../store/redusers";

export const authRoutes = [
  { path: ADMIN_ROUTE, Component: Admin },
  { path: BASKET_ROUTE, Component: Basket },
];

export const publicRoutes = [
  // { path: SHOP_ROUTE, Component: Shop },
  { path: LOGIN_ROUTE, Component: Auth },
  { path: REGISTRATION_ROUTE, Component: Auth },
  { path: BOOK_ROUTE + "/:id", Component: BookPage },
];

const AppRouter: React.FC = () => {
  const isAuth = true;
  return (
    <Div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Shop />} />
          <Route path={BOOK_ROUTE} element={<Shop />} />
          <Route path={BOOK_ROUTE + "/:id"} element={<BookPage />} />
          <Route path={LOGIN_ROUTE} element={<Auth />} />
          <Route path={REGISTRATION_ROUTE} element={<Auth />} />
          <Route
            path={ADMIN_ROUTE}
            element={
              <RequireAuth>
                <Admin />
              </RequireAuth>
            }
          />
          <Route
            path={BASKET_ROUTE}
            element={
              <RequireAuth>
                <Basket />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to={SHOP_ROUTE} />} />
        </Route>
      </Routes>
    </Div>
  );
};

function RequireAuth({ children }: { children: JSX.Element }) {
  let { isAuth } = useSelector((state: RootState) => state.user);
  let location = useLocation();
  if (!isAuth) {
    return <Navigate to={LOGIN_ROUTE} state={{ from: location }} replace />;
  }
  return children;
}

export default AppRouter;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    overflow-y: scroll;
  }
`;

const Div = styled.div`
  width: 1150px;
  margin: 0 auto;
  font-family: sans-serif;
`;
