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
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const AuthorBar: React.FC = () => {
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const { authors } = useTypedSelector((state) => state.author);
  const [selected, setSelected] = React.useState<number[]>([]);
  const [personName, setPersonName] = React.useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchAuthors());
    }, 1000);
  }, []);

  if (authors.length === 0) return <p>Loading...</p>;

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  console.log(personName);
  return (
    <Div>
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="author-select-lebel">Author</InputLabel>
          <Select
            labelId="author-select-lebel"
            id="author-select"
            multiple
            value={personName}
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
      </div>
    </Div>
  );
};

export default AuthorBar;
const Div = styled.div`
  //color: red;
`;
