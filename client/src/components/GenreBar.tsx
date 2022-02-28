import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { fetchGenres, setSelectedGenres } from "../store/actions/genre";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const GenreBar: React.FC = () => {
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const { genres, error, loading, selectedGenres } = useTypedSelector(
    (state) => state.genre
  );
  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

  return (
    <Nav aria-label="genre">
      <List>
        {genres.map((genre: any) => (
          <ListItem key={genre.id} disablePadding>
            <ListItemButton
              selected={genre.id === Number(searchParams.get("genre"))}
              onClick={() => {
                searchParams.delete("page");
                if (genre.id === Number(searchParams.get("genre"))) {
                  //searchParams.delete("genre");
                  setSearchParams(searchParams);
                } else {
                  //set genre to URL first
                  searchParams.set("genre", String(genre.id));
                  setSearchParams(searchParams);
                }
              }}
            >
              <ListItemText primary={genre.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Nav>
  );
};

export default GenreBar;
const Nav = styled.nav`
  .lb {
  }
`;
