import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound(){
    return (
        <Container component={Paper} sx={{height:70}}>
            <Typography gutterBottom variant="h3">oops - we could not find what you are
                <Divider/>
                <Button fullWidth component={Link} to="/catalog">Go back to shop</Button>
            </Typography>
        </Container>    
    )
}