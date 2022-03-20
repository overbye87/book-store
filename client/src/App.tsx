import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { check } from "./http/userAPI";
import { setIsAuthAndUserAction } from "./store/actions/user";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    check() //load user
      .then((user) => {
        dispatch(setIsAuthAndUserAction(true, user));
      })
      .finally(() => setLoading(false));
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
