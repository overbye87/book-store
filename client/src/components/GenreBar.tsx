import React, { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { fetchGenres } from "../store/actions/genre";
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

const GenreBar: React.FC = () => {
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const { genres } = useTypedSelector((state) => state.genre);
  const [genreId, setGenreId] = React.useState<(string | null)[]>([]);

  useEffect(() => {
    dispatch(fetchGenres());

    const parsed = queryString.parse(searchParams.toString(), {
      arrayFormat: "comma",
      parseNumbers: false,
    });
    //console.log(parsed);

    if (Array.isArray(parsed.genre)) {
      setGenreId([...parsed.genre]);
    } else {
      if (parsed.genre) {
        setGenreId([parsed.genre]);
      } else setGenreId([]);
    }
  }, []);

  useEffect(() => {
    searchParams.delete("page");
    if (!genreId.length) {
      searchParams.delete("genre");
      setSearchParams(searchParams);
    } else {
      searchParams.set("genre", genreId.join());
      setSearchParams(searchParams);
    }
  }, [genreId]);

  if (genres.length === 0)
    return (
      <Div>
        <p>Loading...</p>
      </Div>
    );

  const handleChange = (event: SelectChangeEvent<typeof genreId>) => {
    const {
      target: { value },
    } = event;
    //console.log(value);
    setGenreId(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  //console.log(genreId);
  return (
    <Div>
      <FormControl className="formcontroll">
        <InputLabel id="genre-select-lebel">Genre</InputLabel>
        <Select
          labelId="genre-select-lebel"
          id="genre-select"
          multiple
          value={genreId}
          onChange={handleChange}
          input={<OutlinedInput label="Genre" />}
        >
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Div>
  );
};

export default GenreBar;
const Div = styled.div`
  display: flex;
  .formcontroll {
    margin: 5px;
    flex-grow: 1;
  }
`;
