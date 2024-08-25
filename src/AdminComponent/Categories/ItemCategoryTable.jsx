import { Box, Card, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import React, { useEffect, useState } from "react";
import { Delete } from "@mui/icons-material";
import AddCategoryForm from "./AddCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from 'C:/Chamil/E/MIT/SDP/frontend/shopmate/src/component/State/Category/Action';
import { deleteCategory } from '../../ApiService/Api';
import Swal from 'sweetalert2';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const ItemCategoryTable = () => {
    const { category } = useSelector((store) => store);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const [showModal, setShowModal] = useState(false);
    const [res, setRes] = useState("");
    console.log("category details", category);

    useEffect(() => {
        dispatch(getAllCategories(jwt));
    }, [showModal, dispatch, jwt]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCategory(id)
                    .then(() => {
                        dispatch(getAllCategories(jwt));
                        Swal.fire(
                            'Deleted!',
                            'The category has been deleted.',
                            'success'
                        );
                    })
                    .catch((error) => {
                        console.error("Error deleting category:", error);
                        Swal.fire(
                            'Error!',
                            'There was an error deleting the category.',
                            'error'
                        );
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'The category is safe. ',
                    'error'
                );
            }
        });
    };

    return (
        <Box>
            <Card className="mt-1">
                <CardHeader action={<IconButton onClick={() => { setShowModal(true) }} aria-label="settings"><CreateIcon /></IconButton>} title={"Item Category"} sx={{ pt: 2, alignments: "center" }} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Category Name</TableCell>
                                <TableCell align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {category.categories.map((item) => (
                                <TableRow
                                    key={item.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        {item.id}
                                    </TableCell>
                                    <TableCell align="center">{item.name}</TableCell>
                                    <TableCell align="center"><IconButton onClick={() => handleDelete(item.id)}><Delete /></IconButton></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            <Modal
                open={showModal}
                onClose={() => { setShowModal(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddCategoryForm handleClose={setShowModal} setReponse={setRes} />
                </Box>
            </Modal>
        </Box>
    );
}
