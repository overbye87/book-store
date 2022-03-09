import React from "react";
import styled from "styled-components";

import { NavLink, useNavigate } from "react-router-dom";
import { BOOK_ROUTE } from "../constants";
import { IBook } from "../types/books";

interface ICommentItemProps {
  comment: any;
}

const BookItem: React.FC<ICommentItemProps> = ({ comment }) => {
  let navigate = useNavigate();

  return (
    <Div>
      <div className="id">{comment.id}</div>
      <div className="text">{comment.text}</div>
    </Div>
  );
};

export default BookItem;

const Div = styled.div`
  display: flex;
  border: solid 2px gray;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 5px;
  .id {
    font-size: 1.2em;
    color: gray;
    margin-right: 1em;
  }
  .text {
    font-size: 1.2em;
    color: gray;
  }

  .card__description {
    font-size: 1.1em;
    text-indent: 1.5em;
  }
`;
