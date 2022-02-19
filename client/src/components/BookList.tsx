import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import BookItem from "./BookItem";

const BookCard = styled(Paper)({
  color: "darkslategray",
  backgroundColor: "#96ccc9",
  padding: 8,
  borderRadius: 4,
});

const BookList: React.FC = () => {
  const { books, error, loading } = useTypedSelector((state) => state.book);
  const { fetchBooks } = useActions();

  // useEffect(() => {
  //   fetchBooks();
  // }, []);

  //console.log(state);
  if (loading) return <h3>Loading, please wait...</h3>;
  if (error) return <h3>{error}</h3>;
  return (
    <Grid container spacing={1}>
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </Grid>
  );
};

export default BookList;
