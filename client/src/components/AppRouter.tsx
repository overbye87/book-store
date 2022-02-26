import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import React from "react";
import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
//import { authRoutes, publicRoutes } from "../routes";

import Admin from "../pages/Admin";
import Auth from "../pages/Auth";
import Basket from "../pages/Basket";
import BookPage from "../pages/BookPage";
import Shop from "../pages/Shop";

import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  BOOK_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "../constants";

import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";

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
    <div>
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
    </div>
  );
};

function RequireAuth({ children }: { children: JSX.Element }) {
  let { isAuth } = useTypedSelector((state) => state.user);
  let location = useLocation();
  if (!isAuth) {
    return <Navigate to={LOGIN_ROUTE} state={{ from: location }} replace />;
  }

  return children;
}

function Layout() {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Item>
            <Header />
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <NavBar />
          </Item>
        </Grid>
        {/* --- */}
        <Grid item container>
          <Outlet />
        </Grid>
        {/* --- */}
        <Grid item xs={12}>
          <Item>
            <Footer />
          </Item>
        </Grid>
      </Grid>
    </div>
  );
}

export default AppRouter;

const Item = styled(Paper)({
  color: "darkslategray",
  backgroundColor: "papayawhip",
  padding: 8,
  borderRadius: 4,
});
