import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { fetchGenres, setSelectedGenres } from "../store/actions/genre";

const GenreBar: React.FC = () => {
  const dispatch = useDispatch();
  const { genres, error, loading, selectedGenres } = useTypedSelector(
    (state) => state.genre
  );

  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

  return (
    <nav aria-label="secondary mailbox folders">
      <List>
        {genres.map((genre: any) => (
          <ListItem key={genre.id} disablePadding>
            <ListItemButton
              selected={genre.id === selectedGenres.id}
              onClick={() => {
                dispatch(setSelectedGenres(genre.id));
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
