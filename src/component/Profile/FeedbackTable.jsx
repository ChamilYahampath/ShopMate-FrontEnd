import { Box, Card, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import React from "react";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllItems } from 'C:/Chamil/E/MIT/SDP/frontend/shopmate/src/component/State/Item/Action';
import { deleteItem } from "../../ApiService/Api";

export const FeedbackTable = () => {
    const {item} = useSelector((store) => store);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllItems(jwt));
    },[]);


    return (
        <Box>
            <Card className="mt-1">
                <CardHeader action={<IconButton onClick={()=>navigate("/admin/items/add-item")} aria-label="settings"><CreateIcon/></IconButton>} title={"Items"} sx={{pt:2,alignments:"center"}}/>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Image</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Availability</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {item.items.map((item) => (
                                <TableRow
                                key={item.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row" align="center">
                                    {item.id}
                                </TableCell>
                                <TableCell align="center">{item.name}</TableCell>
                                <TableCell align="center">{item.description}</TableCell>
                                <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img src={item.images} alt={item.name} style={{ width: "100px", height: "auto" }} /></TableCell>
                                <TableCell align="center">Rs.{item.price}.00</TableCell>
                                <TableCell align="center">{"IN STOCK"}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            </Card>
        </Box>
    )
}