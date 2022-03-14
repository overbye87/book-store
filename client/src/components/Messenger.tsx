import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io";
import styled from "styled-components";
import { WebsocketBuilder } from "websocket-ts/lib";
import { RootState } from "../store/redusers";
//import {  Socket } from "socket.io-client";

const Messenger = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [value, setValue] = useState("");
  const [connacted, setConnacted] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);

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
      socket.current = new WebSocket("ws://localhost:5000");
      socket.current.onopen = () => {
        setConnacted(true);
        const message = {
          event: "connection",
          id: user.id,
        };
        socket.current.send(JSON.stringify(message));
      };
      socket.current.onmessage = (event: any) => {
        const message = JSON.parse(event.data);
        setMessages((prev) => [message, ...prev]);
        console.log(messages);
      };
      socket.current.onclose = () => {
        console.log("socket closed...");
      };
      socket.current.onerror = () => {
        console.log("socket error...");
      };
    }
  }, []);
  const sendMessage = () => {
    const message = {
      username: user?.name,
      text: value,
      id: Date.now(),
      event: "message",
    };
    socket.current.send(JSON.stringify(message));
    setValue("");
  };

  return (
    <Div>
      <h3>Messenger</h3>
      {connacted ? (
        <p className="info">Connected to server</p>
      ) : (
        <p className="info info--warning">Not connected to server</p>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></input>
      <button onClick={sendMessage}>Send</button>
      {messages.map((message: IMessage) => (
        <p key={message.id}>
          <b>{message.username}: </b> {message.text}
        </p>
      ))}
    </Div>
  );
};

interface IMessage {
  id: number;
  message: string;
}

export default Messenger;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
`;
