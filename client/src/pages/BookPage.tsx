import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../components/CommentList";
import Tabs from "../components/Tabs";

const BookPage = () => {
  let navigate = useNavigate();
  return (
    <Div>
      <Tabs />
      <CommentList />
      <button onClick={() => navigate(-1)}>Go back</button>
    </Div>
  );
};

export default BookPage;

const Div = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  //align-items: center;
  justify-content: flex-start;
  button {
    width: 10em;
    text-decoration: none;
    border: 2px solid palevioletred;
    padding: 10px 15px;
    border-radius: 5px;
    background-color: white;
    font-size: 1em;
    &--active {
      color: white;
      background-color: palevioletred;
    }
    :hover {
      cursor: pointer;
      background-color: gray;
      color: white;
      border-color: gray;
    }
  }
`;
