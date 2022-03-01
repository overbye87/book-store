import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import bookImg from "../assets/book.jpg";

import { useNavigate } from "react-router-dom";
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
    <Grid item>
      <Card sx={{ width: 280 }}>
        <CardMedia
          component="img"
          height="200"
          image={book ? process.env.REACT_APP_API_URL + book.img : ""}
          alt="book picture"
        />
        <CardContent>
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
          <Typography variant="h4" color="text.secondary" textAlign="end">
            &#9734;{book.rating}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => navigate(BOOK_ROUTE + "/" + book.id)}
            size="small"
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default BookItem;
