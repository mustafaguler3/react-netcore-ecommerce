import React from 'react';
import './App.css';
import {useEffect, useState} from "react"

function App() {
  const [products,setProducts] = useState([
    {name:"product1",price:200},
    {name:"product2",price:300}
  ])

  function addProduct() 
  {  
    setProducts(prevState => [...prevState,{name:"ms"+prevState.length + 1,price:(prevState.length*100)+100}])
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
        {products.map((item,index) => {
          return <li key={index}>{item.name} - {item.price}</li>
        })}
      </ul>
      <button style={{color:"red"}} onClick={()=>addProduct()}>Add Product</button>
    </div>
  );
}

export default App;
