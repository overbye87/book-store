import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IUser } from "../types/users";
import { deleteComment } from "../http/commentAPI";
import { IComment, IObjParents } from "./CommentList";
import { DEFAULT_AVATAR_FILENAME, DEFAULT_AVATAR_URL } from "../constants";

interface Props {
  comment: IComment;
  getAllBookComments: () => void;
  objParents: IObjParents;
  loginUser: null | IUser;
  onClickReply: (comment: IComment) => void;
  textareaRef: React.MutableRefObject<HTMLDivElement | null>;
}

const CommentItem: React.FC<Props> = ({
  comment,
  getAllBookComments,
  objParents,
  loginUser,
  onClickReply,
  textareaRef,
}) => {
  let navigate = useNavigate();
  const commentRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const getAvatarPath = (user: null | IUser) => {
    if (user === null || user.img === null) {
      return DEFAULT_AVATAR_URL;
    } else {
      return process.env.REACT_APP_API_URL + user.img;
    }
  };

  const getDataString = (isoString: string) => {
    const date = new Date(Date.parse(comment.createdAt));
    return date.toDateString();
  };

  const onClickDelete = (id: number) => {
    deleteComment(id)
      .then((response) => {
        console.log(response);
        getAllBookComments();
      })
      .catch((err) => alert(err))
      .finally(() => {});
  };
  useEffect(() => {
    const commentId = searchParams.get("commentId");
    //console.log(searchParams.get("commentId"));

    if (commentId && +commentId === comment.id) {
      commentRef?.current?.scrollIntoView();
    }
  }, []);

  return (
    <Div>
      <div ref={commentRef} id={`comment${comment.id}`} className="parent">
        <div>
          <img src={getAvatarPath(comment.user)}></img>
        </div>
        <div className="flex flex--grow flex--column">
          <div className="flex flex--name">
            <h5 className="name">
              {comment.user ? comment.user.name : "Stranger"}
            </h5>
            <button
              className={"reply"}
              onClick={() => {
                onClickReply(comment);
                console.log(comment);
                textareaRef?.current?.scrollIntoView();
              }}
            >
              Reply
            </button>
            <div className="emptiness"></div>
            <div className="date">{getDataString(comment.createdAt)}</div>

            {comment.userId == loginUser?.id ? (
              <button
                className="delete"
                onClick={() => {
                  onClickDelete(comment.id);
                }}
              >
                X
              </button>
            ) : null}
          </div>
          <div className="id">ParentID:{comment.parentId}</div>
          <div className="commentid">{comment.id}</div>
          <div className="text">{comment.text}</div>
        </div>
      </div>
      <div className="children">
        {objParents[comment.id]?.map((commentItem) => (
          <div key={`comment${commentItem.id}`}>
            <CommentItem
              comment={commentItem}
              getAllBookComments={getAllBookComments}
              objParents={objParents}
              loginUser={loginUser}
              onClickReply={onClickReply}
              textareaRef={textareaRef}
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

  .parent {
    position: relative;
    display: flex;
    border: solid 2px gray;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 5px;
  }
  .commentid {
    width: 1.2em;
    height: 1.2em;
    border: solid 2px gray;
    background-color: gray;
    color: white;
    border-radius: 0.6em;
    position: absolute;
    top: -5px;
    left: -5px;
    display: flex;
    justify-content: center;
    align-items: center;
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
  .reply {
    font-size: 1em;
    margin-left: 1em;
    padding: 0 5px;
    width: auto;
  }
  .emptiness {
    flex-grow: 1;
  }
  .date {
    color: gray;
    margin-right: 2em;
  }
  .delete {
    color: gray;
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
    font-size: 1.5em;
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
