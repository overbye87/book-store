import React, { useEffect, useRef } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { fetchAuthors } from "../store/actions/author";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import queryString from "query-string";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const AuthorBar: React.FC = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { authors } = useTypedSelector((state) => state.author);
  const [authorId, setAuthorId] = React.useState<(string | null)[]>([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    dispatch(fetchAuthors());
    const parsed = queryString.parse(searchParams.toString(), {
      arrayFormat: "comma",
      parseNumbers: false,
    });
    //console.log(parsed);

    if (Array.isArray(parsed.author)) {
      setAuthorId([...parsed.author]);
    } else {
      if (parsed.author) {
        setAuthorId([parsed.author]);
      } else setAuthorId([]);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    searchParams.delete("page");
    if (!authorId.length) {
      searchParams.delete("author");
      setSearchParams(searchParams);
    } else {
      searchParams.set("author", authorId.join());
      setSearchParams(searchParams);
    }
  }, [authorId]);

  if (authors.length === 0)
    return (
      <Div>
        <p>Loading...</p>
      </Div>
    );

  const handleChange = (event: SelectChangeEvent<typeof authorId>) => {
    const {
      target: { value },
    } = event;
    //console.log(value);
    setAuthorId(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  //console.log(authorId);
  return (
    <Div>
      <FormControl className="formcontroll">
        <InputLabel id="author-select-lebel">Author</InputLabel>
        <Select
          labelId="author-select-lebel"
          id="author-select"
          multiple
          value={authorId}
          onChange={handleChange}
          input={<OutlinedInput label="Author" />}
        >
          {authors.map((author) => (
            <MenuItem key={author.id} value={author.id}>
              {author.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Div>
  );
};

export default AuthorBar;
const Div = styled.div`
  display: flex;
  .formcontroll {
    margin: 5px;
    flex-grow: 1;
  }
`;
