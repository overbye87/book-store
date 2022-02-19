import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

interface IBookItemProps {
  book: {
    name: string;
    price: number;
    img: string;
    rating: number;
    authorId: number;
    genreId: number;
  };
}

const BookItem: React.FC<IBookItemProps> = ({ book }) => {
  return (
    <Grid item sx={{ width: 200 }}>
      <Card>
        <CardMedia
          component="img"
          height="200"
          image="../static/book.jpg"
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
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default BookItem;
