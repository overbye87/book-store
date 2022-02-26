import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";

import AppRouter from "./components/AppRouter";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { check } from "./http/userAPI";
import { setIsAuthAction, setUserAction } from "./store/actions/user";
import { UserActionTypes } from "./types/users";

const App = () => {
  const { isAuth, user } = useTypedSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      check() //load user
        .then((user) => {
          dispatch(setIsAuthAction(true));
          dispatch(setUserAction(user));
        })
        .finally(() => setLoading(false));
    }, 1000);
  }, []);

  if (loading) {
    return <h1>LOADING PLEASE WAIT...</h1>;
  }

  return (
    <AppWrapper>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.div`
  font-family: sans-serif;
`;
