import React, { useState } from "react";
import styled from "styled-components";
import TabComments from "./TabComments";
import TabCover from "./TabCover";
import TabDescription from "./TabDescription";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const outletSwitch = (key: string) => {
    switch (key) {
      case "tab1":
        return <TabCover />;
      case "tab2":
        return <TabDescription />;
      case "tab3":
        return <TabComments />;
      default:
        return <div>invalid parameter</div>;
    }
  };

  return (
    <Div>
      <ul className="tabs">
        <li
          className={activeTab === "tab1" ? "tab tab--active" : "tab"}
          onClick={() => {
            setActiveTab("tab1");
          }}
        >
          cover
        </li>
        <li
          className={activeTab === "tab2" ? "tab tab--active" : "tab"}
          onClick={() => {
            setActiveTab("tab2");
          }}
        >
          description
        </li>
        <li
          className={activeTab === "tab3" ? "tab tab--active" : "tab"}
          onClick={() => {
            setActiveTab("tab3");
          }}
        >
          comments
        </li>
      </ul>
      <div className="outlet">{outletSwitch(activeTab)}</div>
    </Div>
  );
};

export default Tabs;

const Div = styled.div`
  .tabs {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid palevioletred;
    .tab {
      width: 10em;
      padding: 10px 15px;
      list-style: none;
      text-align: center;
      border: 2px solid palevioletred;
      border-bottom: none;
      border-radius: 15px 15px 0 0;
      :hover {
        cursor: pointer;
        background-color: gray;
        color: white;
        border-color: gray;
      }
      &--active {
        color: white;
        background-color: palevioletred;
      }
    }
  }
`;
