import { Button } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";


export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  function addProduct() {
    /*setProducts(prevState => [...prevState,
      {
        id:prevState.length + 101,
        name:"product"+prevState.length + 1,
        price:(prevState.length*100)+100,
        brand:"some brand",
        description:"description"
    }])*/
  }
  useEffect(() => {
    fetch("https://localhost:44394/api/Products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      <ProductList products={products}/>
      <Button variant="contained" onClick={addProduct}>Add Product</Button>
    </>
  );
}
