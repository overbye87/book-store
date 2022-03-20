import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { createComment, fetchCommentsByBookId } from "../http/commentAPI";
import { RootState } from "../store/redusers";
import { IUser } from "../types/users";
import CommentItem from "./CommentItem";
import { IComment } from "./CommentList";

interface PasswordChangeInputs {
  text: string;
}

interface Props {
  getAllBookComments: () => void;
  replyComment: null | IComment;
  onClickRemoveReply: () => void;
  bookId: number;
  textareaRef: React.MutableRefObject<HTMLDivElement | null>;
}
interface IMessage {
  error: boolean;
  message: string;
}

const CommentAddForm: React.FC<Props> = ({
  getAllBookComments,
  replyComment,
  onClickRemoveReply,
  bookId,
  textareaRef,
}) => {
  const [message, setMessage] = useState<IMessage>({
    error: false,
    message: "",
  });
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
      const userId = user ? user.id : null;
      const parentId = replyComment?.id ? replyComment.id : 0;
      console.log(bookId, userId, text, parentId);
      const responseUser = await createComment(bookId, userId, text, parentId);
      reset();
      await getAllBookComments();
      setMessage({ error: false, message: "Comment add successfuly" });
      setTimeout(() => {
        setMessage({ error: false, message: "" });
      }, 3000);
    } catch (error: any) {
      setMessage({ error: true, message: `${error.response.data.message}` });
    }
  };

  return (
    <Div ref={textareaRef}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Add comment:</h3>
        <p className={message.error ? "info info--error" : "info"}>
          {message.message}
        </p>
        <label>Message: </label>
        {replyComment ? (
          <span className="reply">
            Reply for: <b>{replyComment.user.name}</b>{" "}
            <button className="remove" onClick={onClickRemoveReply}>
              remove
            </button>
          </span>
        ) : null}

        <textarea
          {...register("text", {
            required: "Comment message can not be empty",
          })}
        ></textarea>
        <input type="submit" value="Add"></input>
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
  .info {
    margin: 0;
    font-size: 1.5em;
    color: darkgreen;

    &--error {
      color: darkred;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    border: 2px solid gray;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 15px;
    .remove {
      display: inline-block;
      width: 5em;
      margin: 0;
      padding: 0;
      font-size: 0.6em;
      color: palevioletred;
    }
    .reply {
      display: inline;
      margin: 0;
      padding: 0;
      font-size: 1.5em;
      color: palevioletred;
    }
    label {
      margin-top: 0.5em;
      display: none;
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
