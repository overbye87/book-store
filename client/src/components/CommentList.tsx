import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { createComment, fetchCommentsByBookId } from "../http/commentAPI";
import { RootState } from "../store/redusers";
import { IUser } from "../types/users";
import CommentAddForm from "./CommentAddForm";
import CommentItem from "./CommentItem";

interface ICommentResponse {
  bookId: number;
  comments: any[];
}

export interface IComment {
  id: number;
  bookId: number;
  userId: number;
  loginUser: IUser;
  parrentId: number;
  text: string;
  user: IUser;
  createdAt: string;
}

export interface IObjParrents {
  [key: string]: IComment[];
}

const CommentList = () => {
  const { user } = useSelector((state: RootState) => state.user);
  //comment with user include for reply
  const [replyComment, setReplyComment] = useState<null | IComment>(null);
  //special structure object
  //keys of this object is all parent id's from comments - contains arrays of this comments with the same parent id as in the key
  //{ 0 : [ {comment}, {comment}, {comment}, ...]
  //  5 : [ {comment}, ...]
  //  9 : [ {comment}, ...] }

  const [objParrents, setobjParrents] = useState<IObjParrents>({});
  const params = useParams();

  const getAllBookComments = () => {
    if (params.id) {
      fetchCommentsByBookId(params.id)
        .then((response) => {
          //console.log(response);

          let obj: any = {};
          response.comments.forEach((item: IComment) => {
            // if not have property - create []
            if (!obj.hasOwnProperty(`${item.parrentId}`)) {
              obj[`${item.parrentId}`] = [];
            }
            obj[`${item.parrentId}`].push(item);
          });
          setobjParrents(obj);

          console.log(obj[0]);
        })
        .catch((err) => alert(err))
        .finally(() => {});
    }
  };
  const onClickRemoveReply = () => {
    setReplyComment(null);
  };

  useEffect(() => {
    getAllBookComments();
  }, []);

  const onClickReply = (comment: IComment) => {
    setReplyComment(comment);
    //console.log(userReply);
    //console.log(comment);
  };

  if (!objParrents[0])
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
          {objParrents[0]?.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              getAllBookComments={getAllBookComments}
              objParrents={objParrents}
              loginUser={user}
              onClickReply={onClickReply}
            />
          ))}
        </div>
        <CommentAddForm
          getAllBookComments={getAllBookComments}
          replyComment={replyComment}
          onClickRemoveReply={onClickRemoveReply}
          bookId={Number(params.id)}
        />
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
