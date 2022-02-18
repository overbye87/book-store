import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { fetchUsers } from "../store/actions/book";

const BookList: React.FC = () => {
  const { books, error, loading } = useTypedSelector((state) => state.book);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  //console.log(state);
  if (loading) return <h3>Loading, please wait...</h3>;
  if (error) return <h3>{error}</h3>;
  return (
    <div>
      {books.map((book) => (
        <h3 key={book.id}>{book.name}</h3>
      ))}
    </div>
  );
};

export default BookList;
