import { Button } from "@mui/material";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";


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
    agent.Catalog.list().then(products => setProducts(products))
  }, []);
  return (
    <>
      <ProductList products={products} />
    </>
  );
}
