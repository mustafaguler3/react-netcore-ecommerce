import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import agent from "../../app/api/agent";

export default function AboutPage()
{
    return (
        <Container>
            <Typography gutterBottom variant="h2">
                Errors for testing purposes
            </Typography> 
            <ButtonGroup>
                <Button variant="contained" onClick={() => agent.TestErrors.get400Error()}>Test 400 Error</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get401Error()}>Test 401 Error</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get404Error()}>Test 404 Error</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get500Error()}>Test 500 Error</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.getValidationError()}>Validation Error</Button>
            </ButtonGroup>
        </Container>   
    )
}























