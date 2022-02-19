import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { setSelectedGenres } from "../store/actions/genre";

const GenreBar: React.FC = () => {
  const dispatch = useDispatch();
  const { genres, error, loading, selectedGenres } = useTypedSelector(
    (state) => state.genre
  );

  return (
    <nav aria-label="secondary mailbox folders">
      <List>
        {(genres as []).map((genre: any) => (
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
