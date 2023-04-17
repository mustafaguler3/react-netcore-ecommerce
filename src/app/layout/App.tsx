import React from 'react';
import './style.css';
import {useEffect, useState} from "react"
import { Product } from '../models/product';

function App() {
  const [products,setProducts] = useState<Product[]>([]);

  function addProduct() 
  {  
    /*setProducts(prevState => [...prevState,
      {
        id:prevState.length + 101,
        name:"product"+prevState.length + 1,
        price:(prevState.length*100)+100,
        brand:"some brand",
        description:"description"
    }])*/
  }

  useEffect(()=>{
    fetch("http://localhost:5000/api/products")
    .then(response => response.json())
    .then(data => setProducts(data))
  },[])

  return (
    <div className="App">
      <h1 style={{color:"green"}}>mustafa</h1>
      <ul>
        {products.map(product => {
          return <li>{product.name} - {product.price}</li>
        })}
      </ul>
      <button onClick={()=>addProduct()}>Add Product</button>
    </div>
  );
}

export default App;
