import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { createComment, fetchOneBook } from "../http/bookAPI";
import { RootState } from "../store/redusers";
import { IBook } from "../types/books";
import CommentItem from "./CommentItem";

interface PasswordChangeInputs {
  text: string;
}

const CommentList = () => {
  const { isAuth, user } = useSelector((state: RootState) => state.user);
  const [book, setBook] = useState<null | IBook>(null);
  const params = useParams();

  const getOneBook = () => {
    if (params.id) {
      fetchOneBook(params.id)
        .then((response) => {
          //console.log(response);
          setBook(response);
        })
        .catch((err) => alert(err))
        .finally(() => {});
    }
  };

  useEffect(() => {
    getOneBook();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: errorsPassword, isValid: isValidPassword },
  } = useForm<PasswordChangeInputs>({ mode: "onBlur" });

  // --- PASSWORD CHANGE --- --- ---
  const onSubmit: SubmitHandler<PasswordChangeInputs> = async (data) => {
    try {
      const { text } = data;
      console.log(text);
      if (book) {
        const bookId = book.id;
        const userId = user ? user.id : null;
        const answerId = null;
        const responseUser = await createComment(
          bookId,
          userId,
          text,
          answerId
        );
        reset();
        getOneBook();
        //alert("Comment add successfuly");
      }
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  if (!book)
    return (
      <Div>
        <h3>Nothing to show...</h3>
      </Div>
    );
  else
    return (
      <Div>
        <h3>Comments:</h3>
        <div>
          {book
            ? book.comment.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  getOneBook={getOneBook}
                />
              ))
            : "Book list display error!"}
        </div>

        <form key={2} onSubmit={handleSubmit(onSubmit)}>
          <h3>Add comment:</h3>
          <label>Message:</label>
          <textarea
            {...register("text", {
              required: "Comment message can not be empty",
            })}
          ></textarea>
          <input type="submit" value={"Add"}></input>
        </form>
      </Div>
    );
};

export default CommentList;

const Div = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  //align-items: center;
  justify-content: flex-start;

  h3 {
    font-size: 1.5em;
    color: gray;
    //color: palevioletred;
  }
  form {
    display: flex;
    flex-direction: column;
    border: 2px solid gray;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 15px;
    label {
      margin-top: 0.5em;
    }
    input,
    textarea {
      margin: 10px 0;
      padding: 10px 15px;
      border: 2px solid gray;
      border-radius: 5px;
      font-size: 1em;
    }
    input[type="submit"] {
      width: 10em;
      border: 2px solid palevioletred;
      background-color: white;
      cursor: pointer;
      :hover {
        background-color: gray;
        color: white;
        border-color: gray;
      }
    }
  }
`;
