import React from "react";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import bookImg from "../assets/book.jpg";
import styled from "styled-components";

import { NavLink, useNavigate } from "react-router-dom";
import { BOOK_ROUTE } from "../constants";
import { height } from "@mui/system";

interface IBookItemProps {
  book: {
    id: number;
    name: string;
    price: number;
    description: string;
    img: string;
    rating: number;
    authorId: number;
    genreId: number;
    author: { id: number; name: string };
    genre: { id: number; name: string };
  };
}

const BookItem: React.FC<IBookItemProps> = ({ book }) => {
  let navigate = useNavigate();

  return (
    <Card>
      <img src={book ? process.env.REACT_APP_API_URL + book.img : ""}></img>
      <div className="card--content">
        <Typography gutterBottom variant="h5" component="div">
          {book.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div" textAlign="end">
          Price: {book.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Author: {book.author.name} <br />
          Genre: {book.genre.name}
        </Typography>
        <Typography gutterBottom variant="inherit" component="div">
          {book.description}
        </Typography>
        <Typography
          variant="h4"
          color="text.secondary"
          textAlign="end"
        ></Typography>
      </div>
      <div className="card--rating">
        <span>&#9734;{book.rating}</span>
      </div>
      <div className="card--actions">
        <NavLink className={"link"} to={BOOK_ROUTE + "/" + book.id}>
          Learn More
        </NavLink>
      </div>
    </Card>
  );
};

export default BookItem;

const Card = styled.div`
  width: 260px;
  display: flex;
  flex-direction: column;
  background-color: aqua;
  img {
    width: 260px;
  }
  .card--content {
    flex-grow: 1;
  }
  .card--rating {
    text-align: right;
    font-size: 2em;
  }
  .card--actions {
    display: flex;
    justify-content: center;
    .link {
      color: palevioletred;
      flex-grow: 1;
      text-decoration: none;
      text-align: center;
      border: 2px solid palevioletred;
      padding: 10px 15px;
      border-radius: 5px;
      &--active {
        color: white;
        background-color: palevioletred;
      }
      :hover {
        background-color: gray;
        color: white;
        border-color: gray;
      }
    }
  }
`;
