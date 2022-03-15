import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io";
import styled from "styled-components";
import { WebsocketBuilder } from "websocket-ts/lib";
import { RootState } from "../store/redusers";
//import {  Socket } from "socket.io-client";
import io from "socket.io-client";
import { NavLink } from "react-router-dom";
import { IUser } from "../types/users";

const Notification = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [hide, setHide] = useState(true);
  const [alert, setAlert] = useState(false);
  const [value, setValue] = useState("");
  const [connacted, setConnacted] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const socketRef = useRef<any>(null);

  interface INotification {
    id: number;
    text: string;
    url: string;
    read: boolean;
    bookId: number;
    userId: number;
    commentId: number;
    user: IUser;
  }
  interface ISocket {
    current: WebSocket;
  }

  interface IMessage {
    id: number;
    username: string;
    text: string;
    event: string;
  }
  const socket = useRef<any>();

  useEffect(() => {
    if (user) {
      console.log("useEffect[]");
      socketRef.current = io("ws://localhost:4000", {
        query: { userId: user.id },
      });
      socketRef.current.on("connected", (message: any) => {
        setConnacted(user.id == message);
      });
      socketRef.current.on("notifications", (message: any) => {
        console.log(message);
        setNotifications(message);
      });

      socketRef.current.on("message", (message: any) => {
        //console.log(message);
        setMessages((previous) => [message, ...previous]);
        if (hide) {
          setAlert(true);
        }
      });
    }
  }, []);

  const sendMessage = () => {
    const message = {
      username: user?.name,
      text: value,
      id: Date.now(),
    };
    socketRef.current.emit("message:add", message);
    //socketRef.current.send(JSON.stringify(message));
    setValue("");
  };

  const showHide = () => {
    console.log("SH");
    if (hide) {
      setAlert(false);
    }
    setHide(!hide);
  };

  return (
    <Notification__container>
      <a></a>
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
        {/* <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></input> */}
        {/* <button onClick={sendMessage}>Send</button> */}
        {notifications.map((notification: INotification) => (
          <div className="notification_item" key={notification.id}>
            <NavLink
              className="notification_item--link"
              to={`book/${notification.bookId}?commentId=${notification.commentId}`}
            >
              <b>{notification.user.name}</b> answered you
            </NavLink>
          </div>
        ))}
      </div>
    </Notification__container>
  );
};

interface IMessage {
  id: number;
  message: string;
}

export default Notification;

const Notification__container = styled.div`
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
