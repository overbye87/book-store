import React from "react";
import styled from "styled-components";

import { NavLink, useNavigate } from "react-router-dom";
import { BOOK_ROUTE } from "../constants";
import { IBook } from "../types/books";
import { IUser } from "../types/users";
import { deleteComment } from "../http/commentAPI";
import { IComment, IObjParrents } from "./CommentList";
import { userInfo } from "os";

interface Props {
  comment: IComment;
  getAllBookComments: () => void;
  objParrents: IObjParrents;
  user: null | IUser;
}

const CommentItem: React.FC<Props> = ({
  comment,
  getAllBookComments,
  objParrents,
  user,
}) => {
  let navigate = useNavigate();

  const getAvatarPath = (user: null | IUser) => {
    if (user === null || user.img === null) {
      return process.env.REACT_APP_API_URL + "avatar.png";
    } else {
      return process.env.REACT_APP_API_URL + user.img;
    }
  };

  const getDataString = (isoString: string) => {
    const date = new Date(Date.parse(comment.createdAt));
    return date.toDateString();
  };

  const onClick = (id: number) => {
    deleteComment(id)
      .then((response) => {
        console.log(response);
        getAllBookComments();
      })
      .catch((err) => alert(err))
      .finally(() => {});
  };

  return (
    <Div>
      <div className="parrent">
        <div>
          <img src={getAvatarPath(comment.user)}></img>
        </div>
        <div className="flex flex--grow flex--column">
          <div className="flex flex--name">
            <h5 className="name">
              {comment.user ? comment.user.name : "Stranger"}
            </h5>
            <div className="date">{getDataString(comment.createdAt)}</div>
            <button
              className={
                comment.userId == user?.id ? "delete" : "delete delete--hide"
              }
              onClick={() => {
                onClick(comment.id);
              }}
            >
              &#128465;
            </button>
          </div>
          <div className="id">ParrentID:{comment.parrentId}</div>
          <div className="id">ID:{comment.id}</div>
          <div className="text">{comment.text}</div>
        </div>
      </div>
      <div className="children">
        {objParrents[comment.id]?.map((comment: any) => (
          <div>
            <CommentItem
              key={comment.id}
              comment={comment}
              getAllBookComments={getAllBookComments}
              objParrents={objParrents}
              user={user}
            />
          </div>
        ))}
      </div>
    </Div>
  );
};

export default CommentItem;

const Div = styled.div`
  display: flex;
  flex-direction: column;

  .parrent {
    display: flex;
    border: solid 2px gray;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 5px;
  }
  .children {
    margin-left: 120px;
  }
  .flex {
    display: flex;
    &--column {
      flex-direction: column;
    }
    &--name {
      //justify-content: space-between;
    }
    &--grow {
      flex-grow: 1;
    }
  }
  .name {
    flex-grow: 1;
  }
  .date {
    color: gray;
    margin-right: 2em;
  }
  .delete {
    font-size: 1.3em;
    padding: 3px;
    width: 2em;
    &--hide {
      display: none;
    }
  }
  img {
    width: 100px;
    height: 100px;
    //border: solid 2px gray;
    border-radius: 5px;
    margin-right: 15px;
  }
  .name {
    margin: 0;
    margin-bottom: 5px;
    font-size: 1.2em;
    color: palevioletred;
  }
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
