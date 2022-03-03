import React from "react";
import styled from "styled-components";

import PriceBar from "../components/PriceBar";
import AuthorBar from "../components/AuthorBar";
import GenreBar from "../components/GenreBar";

import PagesBar from "../components/PagesBar";
import BookList from "../components/BookList";

const Shop = () => {
  return (
    <Div>
      <div className="column column--filters">
        <PriceBar />
        <AuthorBar />
        <GenreBar />
      </div>

      <div className="column column--booklist">
        <PagesBar />
        <BookList />
      </div>
    </Div>
  );
};

export default Shop;

const Div = styled.div`
  flex-grow: 1;
  display: flex;
  .column {
    display: flex;
    flex-direction: column;
    &--filters {
      width: 300px;
    }
    &--booklist {
      flex-grow: 1;
    }
  }
`;
