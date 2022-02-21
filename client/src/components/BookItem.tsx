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
import { BOOK_ROUTE } from "../utils/consts";

interface IBookItemProps {
  book: {
    id: number;
    name: string;
    price: number;
    img: string;
    rating: number;
    authorId: number;
    genreId: number;
  };
}

const BookItem: React.FC<IBookItemProps> = ({ book }) => {
  let navigate = useNavigate();

  return (
    <Grid item>
      <Card sx={{ width: 220, height: 500 }}>
        <CardMedia
          component="img"
          height="200"
          image={bookImg}
          alt="book picture"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {book.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            authorId: {book.authorId} <br />
            genreId: {book.genreId}
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
