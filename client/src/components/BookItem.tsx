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
import { IBook } from "../types/books";

interface IBookItemProps {
  book: IBook;
}

const BookItem: React.FC<IBookItemProps> = ({ book }) => {
  let navigate = useNavigate();

  return (
    <Card>
      <img src={book ? process.env.REACT_APP_API_URL + book.img : ""}></img>
      <div className="card__content">
        <h3 className="name">{book.name}</h3>
        <p className="price">
          Price: <b>{book.price}</b>
        </p>
        <p className="filter">Author: {book.author.name}</p>
        <p className="filter">Genre: {book.genre.name}</p>
        <p className="description">{book.description}</p>
      </div>
      <div className="card__rating">
        rating
        {/* <span>&#9734;{book.rating}</span> */}
      </div>
      <div className="card__actions">
        <NavLink className={"link"} to={BOOK_ROUTE + "/" + book.id}>
          Read more...
        </NavLink>
      </div>
    </Card>
  );
};

export default BookItem;

const Card = styled.div`
  position: relative;
  width: 200px;
  height: 450px;
  display: flex;
  flex-direction: column;
  //background-color: aqua;
  border: solid 1px gray;
  border-radius: 5px;
  padding: 15px;
  img {
    padding: 5px;
    width: 190px;
  }
  .card__content {
    flex-grow: 1;
    .name {
      margin: 5px 0;
      font-size: 1.5em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .price {
      color: #1976d2;
      margin: 5px 0;
      text-align: right;
      font-size: 1.5em;
    }
    .filter {
      color: gray;
      font-size: 1em;
      margin: 0;
    }
    .description {
      margin: 10px 0;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      text-indent: 1.5em;
      //text-align: justify;
      overflow: hidden;
    }
  }
  .card__rating {
    position: absolute;
    top: 150px;
    right: 15px;
    color: palevioletred;
    font-size: 2.5em;
  }
  .card__actions {
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
