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
import queryString from "query-string";

const AuthorBar: React.FC = () => {
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const { authors, error, loading, selectedAuthors } = useTypedSelector(
    (state) => state.author
  );

  const [selected, setSelected] = React.useState<any[]>([0]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchAuthors());
    }, 1000);

    const parsed = queryString.parse(searchParams.toString(), {
      arrayFormat: "comma",
      parseNumbers: true,
    });
    if (Array.isArray(parsed.author)) {
      setSelected([0, ...parsed.author]);
    } else {
      if (parsed.author) {
        setSelected([0, parsed.author]);
      } else setSelected([0]);
    }
  }, []);

  useEffect(() => {
    if (selected.length <= 1) {
      searchParams.delete("author");
      setSearchParams(searchParams);
    } else {
      searchParams.set("author", selected.slice(1).join());
      setSearchParams(searchParams);
    }
  }, [selected]);

  if (authors.length === 0) return <h3>Loading...</h3>;
  return (
    <Nav aria-label="author">
      <List>
        {authors.map((author: any) => (
          <ListItem key={author.id} disablePadding>
            <ListItemButton
              className={"lb"}
              selected={selected.indexOf(author.id) !== -1}
              onClick={() => {
                const currentIndex = selected.indexOf(author.id);
                const newSelected = [...selected];
                if (currentIndex === -1) {
                  newSelected.push(author.id);
                } else {
                  newSelected.splice(currentIndex, 1);
                }
                setSelected(newSelected);
                //set page to 1
                searchParams.delete("page");
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
