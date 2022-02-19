import React from "react";
import { useDispatch } from "react-redux";
import { setIsAuthAction } from "../store/actions/user";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Book - Store</h1>
      <button
        onClick={() => {
          dispatch(setIsAuthAction(true));
        }}
        color="inherit"
      >
        set isAuth to true
      </button>
      <button
        onClick={() => {
          dispatch(setIsAuthAction(false));
        }}
        color="inherit"
      >
        set isAuth to false
      </button>
    </div>
  );
};

export default Header;
