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
import queryString from "query-string";

const GenreBar: React.FC = () => {
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const { genres, error, loading, selectedGenres } = useTypedSelector(
    (state) => state.genre
  );

  const [selected, setSelected] = React.useState<any[]>([0]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchGenres());
    }, 1000);

    const parsed = queryString.parse(searchParams.toString(), {
      arrayFormat: "comma",
      parseNumbers: true,
    });
    if (Array.isArray(parsed.genre)) {
      setSelected([0, ...parsed.genre]);
    } else {
      if (parsed.genre) {
        setSelected([0, parsed.genre]);
      } else setSelected([0]);
    }
    //console.log("from URL", selected);
  }, []);

  useEffect(() => {
    if (selected.length <= 1) {
      searchParams.delete("genre");
      setSearchParams(searchParams);
    } else {
      searchParams.set("genre", selected.slice(1).join());
      setSearchParams(searchParams);
    }
  }, [selected]);
  if (genres.length === 0) return <h3>Loading...</h3>;
  return (
    <Nav aria-label="genre">
      <List>
        {genres.map((genre: any) => (
          <ListItem key={genre.id} disablePadding>
            <ListItemButton
              className={"lb"}
              selected={selected.indexOf(genre.id) !== -1}
              onClick={() => {
                const currentIndex = selected.indexOf(genre.id);
                const newSelected = [...selected];
                if (currentIndex === -1) {
                  newSelected.push(genre.id);
                } else {
                  newSelected.splice(currentIndex, 1);
                }
                setSelected(newSelected);
                //set page to 1
                searchParams.delete("page");
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
