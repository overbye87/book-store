import React from "react";
import styled from "styled-components";
import UserDataChange from "../components/UserDataChange";
import UserPasswordChange from "../components/UserPasswordChange";

const Admin: React.FC = () => {
  return (
    <Div>
      <UserDataChange />
      <UserPasswordChange />
    </Div>
  );
};

export default Admin;

const Div = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  .column {
    width: 500px;
    display: flex;
    flex-direction: column;
    h3 {
      font-size: 1.5em;
      color: palevioletred;
      text-align: center;
    }
    .info {
      font-size: 1.5em;
      color: darkgreen;
      text-align: center;
      &--error {
        color: darkred;
      }
    }
    form {
      display: flex;
      flex-direction: column;

      label {
        margin-top: 0.5em;
      }
      input {
        margin: 10px 0;
        padding: 10px 15px;
        border: 2px solid gray;
        border-radius: 5px;
        font-size: 1em;
      }
      span {
        color: palevioletred;
      }
      input[type="file"] {
        //display: none;
      }
      input[type="submit"],
      input[type="file"] {
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
  }
`;
