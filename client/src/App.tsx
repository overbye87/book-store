import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { check } from "./http/userAPI";
import { setIsAuthAction, setUserAction } from "./store/actions/user";

const App = () => {
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
    return <h1>APP LOADING PLEASE WAIT...</h1>;
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
