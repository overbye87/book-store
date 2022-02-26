import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { fetchAuthors, setSelectedAuthors } from "../store/actions/author";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Paper from "@mui/material/Paper";

const AuthorBar: React.FC = () => {
  const dispatch = useDispatch();
  const { authors, error, loading, selectedAuthors } = useTypedSelector(
    (state) => state.author
  );
  const { selectedGenres } = useTypedSelector((state) => state.genre);

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchAuthors());
    dispatch(setSelectedAuthors(Number(localStorage.getItem("authorId"))));
  }, []);

  return (
    <Nav aria-label="author">
      <List>
        {authors.map((author: any) => (
          <ListItem key={author.id} disablePadding>
            <ListItemButton
              className={"lb"}
              selected={author.id === selectedAuthors.id}
              onClick={() => {
                dispatch(setSelectedAuthors(author.id));
                localStorage.setItem("authorId", author.id);
                setSearchParams({
                  author: String(author.id),
                  genre: String(selectedGenres.id),
                });
              }}
            >
              <ListItemText primary={author.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Nav>
  );
};

export default AuthorBar;
const Nav = styled.nav`
  .lb {
  }
`;
