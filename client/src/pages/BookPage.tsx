import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { $host } from "../http";
import { IAuthor } from "../types/authors";
import { IGenre } from "../types/genres";

export interface IBook {
  id: number;
  img: string;
  name: string;
  price: number;
  rating: number;
  description: string;
  author: IAuthor;
  genre: IGenre;
}

async function fetchOneBook(id: string) {
  const response = await $host.get("api/book/" + id);
  return response.data;
}

const BookPage = () => {
  const params = useParams();
  const [book, setBook] = useState<null | IBook>(null);

  useEffect(() => {
    if (params.id) {
      fetchOneBook(params.id)
        .then((response) => {
          console.log(response);
          setBook(response);
        })
        .catch((err) => alert(err))
        .finally(() => {});
    }
  }, []);

  let navigate = useNavigate();

  if (!book)
    return (
      <Div>
        <h2>Nothing to show...</h2>
      </Div>
    );
  else
    return (
      <Div>
        <h2>{book.name}</h2>
        <div className="card">
          <div className="container">
            <div className="card__img">
              <img
                src={book ? process.env.REACT_APP_API_URL + book.img : ""}
              ></img>
            </div>
            <div className="card__properties">
              <div className="card__rating">
                <span>&#9734;{book.rating}</span>
              </div>
              <p className="price">
                Price: <b>{book.price}</b>
              </p>
              <p className="filter">Author: {book.author.name}</p>
              <p className="filter">Genre: {book.genre.name}</p>
            </div>
          </div>
          <div className="card__description">
            <p className="card__description">{book.description}</p>
          </div>
        </div>
        <button onClick={() => navigate(-1)}>go back</button>
      </Div>
    );
};

export default BookPage;

const Div = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  //align-items: center;
  justify-content: flex-start;

  h2 {
    font-size: 2em;
    color: palevioletred;
  }
  .container {
    display: flex;
    .card__img {
      border: 1px solid gray;
      border-radius: 5px;
      padding: 15px;
    }
    .card__properties {
      flex-grow: 1;
      padding: 15px;
      .price {
        color: #1976d2;
        font-size: 1.5em;
      }
      .filter {
        color: gray;
        font-size: 1em;
        margin: 0;
      }
      .card__rating {
        color: palevioletred;
        font-size: 2.5em;
      }
    }
  }
  .card__description {
    font-size: 1.1em;
    text-indent: 1.5em;
  }

  button {
    text-decoration: none;
    border: 2px solid palevioletred;
    padding: 10px 15px;
    border-radius: 5px;
    background-color: white;
    font-size: 1em;
    &--active {
      color: white;
      background-color: palevioletred;
    }
    :hover {
      cursor: pointer;
      background-color: gray;
      color: white;
      border-color: gray;
    }
  }
`;
