import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import { Product } from "../../app/models/product";

interface Props {
  products: Product[];
}

export default function ProductList({products}: Props) {
  return (
      <Grid container spacing={4}>
        {products.map(product => (
          <Grid item xs={3} key={product.id}>
          <ProductCard product={product} />
        </Grid>
        ))}
      </Grid>
  );
}
