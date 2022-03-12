import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { IBook } from "../types/books";

interface Props {
  book: null | IBook;
}

const TabDescription: React.FC<Props> = ({ book }) => {
  const params = useParams();
  if (!book)
    return (
      <Div>
        <h2>Nothing to show...</h2>
      </Div>
    );
  else
    return (
      <Div>
        <h2>{book.name}</h2>
        <div className="card__description">
          <h3>Description:</h3>
          <p className="card__description">{book.description}</p>
        </div>
      </Div>
    );
};

export default TabDescription;

const Div = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  //align-items: center;
  justify-content: flex-start;

  h2 {
    font-size: 2em;
    color: palevioletred;
  }

  .card__description {
    font-size: 1.1em;
    text-indent: 1.5em;
  }
`;
