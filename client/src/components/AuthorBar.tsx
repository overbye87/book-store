import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { setSelectedAuthors } from "../store/actions/author";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const AuthorBar: React.FC = () => {
  const dispatch = useDispatch();
  const { authors, error, loading, selectedAuthors } = useTypedSelector(
    (state) => state.author
  );

  return (
    <nav aria-label="secondary mailbox folders">
      <List>
        {authors.map((author: any) => (
          <ListItem key={author.id} disablePadding>
            <ListItemButton
              selected={author.id === selectedAuthors.id}
              onClick={() => {
                dispatch(setSelectedAuthors(author.id));
              }}
            >
              <ListItemText primary={author.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </nav>
  );
};

export default AuthorBar;
