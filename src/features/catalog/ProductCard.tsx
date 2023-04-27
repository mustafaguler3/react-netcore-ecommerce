import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../app/context/StoreContext";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, setBasket } from "../basket/basketSlice";

interface Props 
{
    product:Product;
}

export default function ProductCard({product}:Props) {
  //const [loading,setLoading] = useState(false);
  const {status} = useAppSelector(state => state.basket)
  //const { setBasket } = useStoreContext();
  const dispatch = useAppDispatch();

  return (
    <>
      <Card>
        <CardHeader avatar={
        <Avatar sx={{bgcolor:"secondary.main"}}>{product.name.charAt(0).toUpperCase()}</Avatar>} title={product.name} 
        titleTypographyProps={{sx:{fontWeight:"bold",color:"primary.main"}}}/>

      <CardMedia
        sx={{ height: 140 ,backgroundSize:"contain",bgcolor:"primary.light"}}
        image={product.pictureUrl}
        title={product.name}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" color='secondary'>
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>

      <CardActions>
        <LoadingButton 
        loading={status.includes("pendingAddItem" + product.id)} 
        onClick={() => dispatch(addBasketItemAsync({productId: product.id}))} 
        size="small">Add To Card</LoadingButton>

        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
    </>
  );
}
