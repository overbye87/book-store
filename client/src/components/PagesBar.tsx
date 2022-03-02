import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Pages: React.FC = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  //let [page, setPage] = React.useState(searchParams.get("page"));
  //let [limit, setLimit] = React.useState(searchParams.get("limit"));
  const { books, error, loading } = useTypedSelector((state) => state.book);
  return (
    <Stack spacing={2}>
      <Pagination
        count={books ? Math.ceil(books.count / books.limit) : 0}
        page={Number(searchParams.get("page")) || 1}
        onChange={(e, value) => {
          //set page to URL first
          searchParams.set("page", String(value));
          //searchParams.set("limit", String(limit));
          setSearchParams(searchParams);
        }}
      />
    </Stack>
  );
};

export default Pages;
