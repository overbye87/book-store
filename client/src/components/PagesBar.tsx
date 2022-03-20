import React from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";
import { RootState } from "../store/redusers";

const Pages: React.FC = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const { books, error, loading } = useSelector(
    (state: RootState) => state.book
  );

  const count = books ? Math.ceil(books.count / books.limit) : 0;
  const page = Number(searchParams.get("page")) || 1;

  return (
    <Div>
      <Pagination
        count={count}
        page={page}
        onChange={(e, value) => {
          //set page to URL first
          searchParams.set("page", String(value));
          //searchParams.set("limit", String(limit));
          setSearchParams(searchParams);
        }}
      />
    </Div>
  );
};

export default Pages;

const Div = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-bottom: solid 1px gray;
  margin: 0 20px;
`;
