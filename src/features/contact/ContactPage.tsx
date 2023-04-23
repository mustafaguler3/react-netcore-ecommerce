import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { CounterState } from "./counterReducer";

export default function ContactPage(){
    const {data,title} = useSelector((state:CounterState) => state);
    return (
        <>
        <Typography variant="h2">
            {title}
        </Typography> 
        <Typography variant="h2">
            The data is : {data}
        </Typography> 
        </>
           
    )
}