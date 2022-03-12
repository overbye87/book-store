import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { createComment, fetchCommentsByBookId } from "../http/commentAPI";
import { RootState } from "../store/redusers";
import CommentItem from "./CommentItem";

interface PasswordChangeInputs {
  text: string;
}

interface IComment {
  bookId: number;
  comments: any[];
}

interface Props {
  comment: IComment;
  getAllBookComments: () => void;
  replyId: number;
}

const CommentAddForm: React.FC<Props> = ({
  comment,
  getAllBookComments,
  replyId,
}) => {
  const { isAuth, user } = useSelector((state: RootState) => state.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: errorsPassword, isValid: isValidPassword },
  } = useForm<PasswordChangeInputs>({ mode: "onBlur" });

  // --- ADD COMMENT --- --- ---
  const onSubmit: SubmitHandler<PasswordChangeInputs> = async (data) => {
    try {
      const { text } = data;
      //console.log(text);
      if (comment) {
        const bookId = comment.bookId;
        const userId = user ? user.id : null;
        const parrentId = replyId;
        console.log(bookId, userId, text, parrentId);
        const responseUser = await createComment(
          bookId,
          userId,
          text,
          parrentId
        );
        reset();
        getAllBookComments();
        //alert("Comment add successfuly");
      }
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <Div>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Add comment:</h3>
        <label>Message:</label>
        {replyId ? <p>{replyId}</p> : ""}

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

export default CommentAddForm;

const Div = styled.div`
  //flex-grow: 1;
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
