import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchBooks } from "../store/actions/book";
import BookItem from "./BookItem";

import styled from "styled-components";
import { RootState } from "../store/redusers";

const BookList: React.FC = () => {
  const dispatch = useDispatch();
  const { books, error, loading } = useSelector(
    (state: RootState) => state.book
  );

  let [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    dispatch(fetchBooks(searchParams));
  }, [searchParams]);

  //console.log(state);
  if (loading)
    return (
      <Div>
        <h3>Loading, please wait...</h3>
      </Div>
    );
  if (books?.rows.length === 0)
    return (
      <Div>
        <h3>Nothing to show...</h3>
      </Div>
    );
  if (error) return <h3>{error}</h3>;
  return (
    <Div>
      {books
        ? books.rows.map((book) => <BookItem key={book.id} book={book} />)
        : "Book list display error!"}
    </Div>
  );
};

export default BookList;

const Div = styled.div`
  flex-grow: 1;
  gap: 15px;
  //width: 700px;
  flex-wrap: wrap;
  display: flex;
  padding: 15px;
  justify-content: center;
`;
