import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useStoreContext } from "../../app/context/StoreContext";

export default function BasketSummary(){
    const { basket } = useStoreContext();    
    const subtotal = basket?.items.reduce((sum,item) => sum + (item.quantity*item.price),0) ?? 0;
    const deliveryFee = subtotal > 10000 ? 0 : 5000;

   

    function currencyFormat(subtotal: number): import("react").ReactNode {
        throw new Error("Function not implemented.");
    }

    return (
        <>
            <TableContainer component={Paper} variant={"outlined"}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal * deliveryFee)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>    
    )
}