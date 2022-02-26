import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { fetchGenres, setSelectedGenres } from "../store/actions/genre";
import { useSearchParams } from "react-router-dom";

const GenreBar: React.FC = () => {
  const dispatch = useDispatch();
  const { genres, error, loading, selectedGenres } = useTypedSelector(
    (state) => state.genre
  );
  const { selectedAuthors } = useTypedSelector((state) => state.author);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchGenres());
    dispatch(setSelectedGenres(Number(localStorage.getItem("genreId"))));
  }, []);
  return (
    <nav aria-label="genre">
      <List>
        {genres.map((genre: any) => (
          <ListItem key={genre.id} disablePadding>
            <ListItemButton
              selected={genre.id === selectedGenres.id}
              onClick={() => {
                dispatch(setSelectedGenres(genre.id));
                localStorage.setItem("genreId", genre.id);
                setSearchParams({
                  author: String(selectedAuthors.id),
                  genre: String(genre.id),
                });
              }}
            >
              <ListItemText primary={genre.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </nav>
  );
};

export default GenreBar;
