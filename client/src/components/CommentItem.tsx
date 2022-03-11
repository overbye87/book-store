import React from "react";
import styled from "styled-components";

import { NavLink, useNavigate } from "react-router-dom";
import { BOOK_ROUTE } from "../constants";
import { IBook } from "../types/books";
import { IUser } from "../types/users";
import { deleteComment } from "../http/bookAPI";

interface ICommentItemProps {
  comment: any;
  getOneBook: () => void;
}

const BookItem: React.FC<ICommentItemProps> = ({ comment, getOneBook }) => {
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
        getOneBook();
      })
      .catch((err) => alert(err))
      .finally(() => {});
  };

  return (
    <Div>
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
            className="delete"
            onClick={() => {
              onClick(comment.id);
            }}
          >
            &#128465;
          </button>
        </div>

        {/* <div className="id">{comment.id}</div> */}
        <div className="text">{comment.text}</div>
      </div>
    </Div>
  );
};

export default BookItem;

const Div = styled.div`
  display: flex;
  border: solid 2px gray;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 5px;
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
