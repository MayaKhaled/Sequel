import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./card.css";
import NotFavorite from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

const MoviesCard = ({ item, handleFavClick }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={item.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        {item.fav === false ? (
          <NotFavorite onClick={(event) => handleFavClick(event, item)} />
        ) : (
          <Favorite onClick={(event) => handleFavClick(event, item)} />
        )}
      </CardActions>
    </Card>
  );
};
export default MoviesCard;
