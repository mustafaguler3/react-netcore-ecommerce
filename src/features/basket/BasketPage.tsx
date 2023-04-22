import { useEffect, useState } from "react"
import { Basket } from "../../app/models/basket"
import agent from "../../app/api/agent"
import LoadingComponent from "../../app/layout/LoadingComponent"
import { Typography } from "@mui/material"

export default function BasketPage(){
    const [loading,setLoading] = useState(true)
    const [basket,setBasket] = useState<Basket | null>(null)

    useEffect(()=>{
        agent.Basket.get()
        .then(basket=> setBasket(basket))
        .catch(error => console.error(error))
        .finally(() => setLoading(false))
    },[])

    if(loading) return <LoadingComponent message="Loading basket"/>

    if(!basket) return <Typography variant="h3">Your basket is empty</Typography>

    return(
        <h1>Buyer id - {basket.buyerId}</h1>
    )
}