import { Button } from "@mui/material";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";


export default function Catalog() {
  //const [products, setProducts] = useState<Product[]>([]);
  const products = useAppSelector(productSelectors.selectAll);
  const {productsLoaded,status} = useAppSelector(state => state.catalog)
  const dispatch = useAppDispatch()
  

  useEffect(() => {
    if(!productsLoaded) dispatch(fetchProductsAsync())
  }, [productsLoaded]);

  if(status.includes("pending")) return <LoadingComponent message="Loading products"/>

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
