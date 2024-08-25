import { Box, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { getAllFeedbacks } from '../../ApiService/Api';
import React, { useEffect, useState } from "react";

const orders=[1,1,1,1,1]

export const AdminFeedbackTable = ({ allFeedbacks, filterValue }) => {const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);

    useEffect(() => {
        if (filterValue === "ALL") {
            setFilteredFeedbacks(allFeedbacks);
        } else {
            const filtered = allFeedbacks.filter((feedback) => feedback.rating.toString() === filterValue);
            setFilteredFeedbacks(filtered);
        }
    }, [allFeedbacks, filterValue]);

    return (
        <Box>
            <Card className="mt-1">
                <CardHeader title="All Feedbacks" sx={{ pt: 2, alignments: "center" }} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Feedback Date</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Rating</TableCell>
                                <TableCell align="center">Order ID</TableCell>
                                <TableCell align="center">Order Date</TableCell>
                                <TableCell align="center">Deliver Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredFeedbacks.map((feedback) => (
                                <TableRow key={feedback.id}>
                                    <TableCell align="center">{feedback.id}</TableCell>
                                    <TableCell align="center">{feedback.name}</TableCell>
                                    <TableCell align="center">{new Date(feedback.feedbackDate).toISOString().split("T")[0]}</TableCell>
                                    <TableCell align="center">{feedback.description}</TableCell>
                                    <TableCell align="center">{feedback.rating}.0</TableCell>
                                    <TableCell align="center">{feedback.orderId}</TableCell>
                                    <TableCell align="center">{feedback.orderDate ? new Date(feedback.orderDate).toISOString().split("T")[0] : '-'}</TableCell>
                                    <TableCell align="center">{feedback.deliverDate ? new Date(feedback.deliverDate).toISOString().split("T")[0] : '-'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
}