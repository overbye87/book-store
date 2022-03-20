import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../store/redusers";
import io from "socket.io-client";
import { NavLink } from "react-router-dom";
import { IMessageRemove, INotification } from "../types/notifications";

const Notification = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [hide, setHide] = useState(true);
  const [alert, setAlert] = useState(false);
  const [connacted, setConnacted] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (user) {
      console.log(`useEffect[${user.name}]`);
      socketRef.current = io("ws://localhost:4000", {
        query: { userId: user.id },
      });
      socketRef.current.on("connected", (message: any) => {
        setConnacted(user.id === message);
      });

      // EVENT GET ALL
      socketRef.current.on(
        "notifications",
        (notificationsArray: INotification[]) => {
          console.log("Notifications received:", notificationsArray);
          setNotifications(notificationsArray);
          notificationsArray.length === 0 ? setAlert(false) : setAlert(true);
        }
      );

      // EVENT REMOVE:RESULT

      socketRef.current.on(
        "notification:remove:result",
        (messageRemove: IMessageRemove) => {
          console.log("Received answer of removing:", messageRemove);
          if (messageRemove.status) {
            setNotifications((previous) => {
              const notificationsArray = previous.filter(
                (notification) => notification.id !== messageRemove.id
              );
              notificationsArray.length === 0
                ? setAlert(false)
                : setAlert(true);
              return notificationsArray;
            });
          }
        }
      );
    }
    return () => {
      // unmounting component - disconnect the socket
      socketRef.current.disconnect();
    };
  }, [user]);

  const showHide = () => {
    console.log("Show/Hide notifi list");
    setHide(!hide);
  };

  const onClick = (notificationId: number) => {
    console.log("Send event notification remove:", notificationId);
    const notifi = {
      notificationId,
    };
    socketRef.current.emit("notification:remove", notifi);
  };

  return (
    <NotificationContainer>
      <button
        className={alert ? "icon icon--alert" : "icon"}
        onClick={showHide}
      >
        !
      </button>
      <div className={hide ? "list list--hide" : "list"}>
        {connacted ? (
          <p className="info">Connected to server</p>
        ) : (
          <p className="info info--warning">Not connected to server</p>
        )}
        {notifications.map((notification: INotification) => (
          <div className="notification_item" key={notification.id}>
            <NavLink
              onClick={() => {
                onClick(notification.id);
              }}
              className="notification_item--link"
              to={`book/${notification.bookId}?commentId=${notification.replyCommentId}`}
            >
              {notification.id} <b>{notification.replyUser.name}</b> answered
              you
            </NavLink>
          </div>
        ))}
      </div>
    </NotificationContainer>
  );
};

export default Notification;

const NotificationContainer = styled.div`
  display: inline;
  //position: relative;
  .icon {
    display: block;
    width: 50px;
    height: 50px;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    font-weight: bold;
    color: palevioletred;
    background-color: white;
    border: solid 2px palevioletred;
    border-radius: 50%;
    cursor: pointer;
    :hover {
      background-color: gray;
      color: white;
      border-color: gray;
    }
    &--alert {
      color: white;
      background-color: palevioletred;
      border: solid 2px palevioletred;
    }
  }
  .list {
    position: absolute;
    z-index: 1000;
    background-color: white;
    border: solid 2px gray;
    margin: 1em;
    padding: 1em;
    border-radius: 5px;
    top: 0px;
    right: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &--hide {
      display: none;
    }
    .info {
      width: 20em;
      text-align: center;
      margin: 10px 0;
      padding: 10px 15px;
      //border: 2px solid gray;
      border-radius: 5px;
      font-size: 1em;
      background-color: darkgreen;
      color: white;
      &--warning {
        background-color: darkred;
      }
    }
    .notification_item {
      &--link {
        display: block;
        text-align: center;
        color: palevioletred;
        width: 20em;
        padding: 5px;
        margin: 5px 0;
        border: solid 2px gray;
        border-radius: 5px;
      }
    }
    input {
      width: 20em;
      margin: 10px 0;
      padding: 10px 15px;
      border: 2px solid gray;
      border-radius: 5px;
      font-size: 1em;
    }
    button {
      box-sizing: content-box;
      width: 20em;
      margin: 10px 0;
      padding: 10px 15px;
      border-radius: 5px;
      font-size: 1em;
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
