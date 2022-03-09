import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchOneBook } from "../http/bookAPI";
import { IBook } from "../types/books";
import CommentItem from "./CommentItem";

const TabComments = () => {
  const [book, setBook] = useState<null | IBook>(null);
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      fetchOneBook(params.id)
        .then((response) => {
          //console.log(response);
          setBook(response);
        })
        .catch((err) => alert(err))
        .finally(() => {});
    }
  }, []);

  if (!book)
    return (
      <Div>
        <h2>Nothing to show...</h2>
      </Div>
    );
  else
    return (
      <Div>
        <h2>Comments:</h2>
        <div>
          {book
            ? book.comment.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))
            : "Book list display error!"}
        </div>
      </Div>
    );
};

export default TabComments;

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
