import { Box, Card, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Button, Dialog, DialogContent, DialogTitle, DialogActions, TextField } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import React from "react";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllItems } from 'C:/Chamil/E/MIT/SDP/frontend/shopmate/src/component/State/Item/Action';
import { deleteItem,updateItemAvailabilityStatus,updateItemDetails } from "../../ApiService/Api";
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object({
    price: Yup.number()
        .min(0, 'Price must be non-negative')
        .required('Price is required'),
    quantity: Yup.number()
        .min(0, 'Quantity must be non-negative')
        .required('Quantity is required'),
});

export const ItemTable = () => {
    const { item } = useSelector((store) => store);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const navigate = useNavigate();

    const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
    const [currentItem, setCurrentItem] = React.useState({});

    const handleOpenUpdateModal = (item) => {
        setCurrentItem(item);
        setOpenUpdateModal(true);
    };
    
    const handleItemsStatus = (id) => {
        console.log("dasdsadasd",id);

        updateItemAvailabilityStatus(id);
        window.location.reload();
    };

    useEffect(() => {
        dispatch(getAllItems(jwt));
    }, [dispatch, jwt]);

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
                deleteItem(id)
                    .then(() => {
                        dispatch(getAllItems(jwt));
                        Swal.fire(
                            'Deleted!',
                            'The item has been deleted.',
                            'success'
                        );
                    })
                    .catch((error) => {
                        console.error("Error deleting item:", error);
                        Swal.fire(
                            'Error!',
                            'There was an error deleting the item.',
                            'error'
                        );
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'The item is safe.',
                    'error'
                );
            }
        });
    };

    const formik = useFormik({
        initialValues: {
            price: currentItem.price || '',
            quantity: currentItem.quantity || '',
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
            try {
                await updateItemDetails(currentItem.id, values);
                Swal.fire('Updated!', 'The item has been updated.', 'success');
                dispatch(getAllItems(jwt));
                setOpenUpdateModal(false);
            } catch (error) {
                Swal.fire('Error!', 'There was an error updating the item.', 'error');
            }
        },
    });


    const handleChange = (e) => {
        setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
    };

    return (
        <Box>
            <Card className="mt-1">
                <CardHeader action={<IconButton onClick={() => navigate("/admin/items/add-item")} aria-label="settings"><CreateIcon /></IconButton>} title={"Items"} sx={{ pt: 2, alignments: "center" }} />
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
                                <TableCell align="center">Delete</TableCell>
                                <TableCell align="center">Update</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {item.items.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        {item.id}
                                    </TableCell>
                                    <TableCell align="center">{item.name}</TableCell>
                                    <TableCell align="center">{item.description}</TableCell>
                                    <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <img src={item.images} alt={item.name} style={{ width: "100px", height: "auto" }} />
                                    </TableCell>
                                    <TableCell align="center">Rs.{item.price}.00</TableCell>
                                    <TableCell align="center">    
                    <Button className='py-[1rem] px-[2rem]' sx={{
    backgroundColor: item.quantity==0 ? 'red' : 'green',
    '&:hover': {
      backgroundColor: item.quantity==0 ? 'red' : 'green',
    },
  }} variant='contained' size='large'>
                        {item.quantity==0 ? "Out of stock" : "In stock"}
                    </Button>  
                    <p className="text-sm mt-2">{item.quantity} items available</p>  
            </TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleDelete(item.id)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleOpenUpdateModal(item)}>
                                            <CreateIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Dialog open={openUpdateModal} onClose={() => setOpenUpdateModal(false)} >
                <DialogTitle>Update Item</DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField name="price" label="Price" value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            margin="normal"
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price} />
                        <TextField name="quantity" label="Quantity" value={formik.values.quantity}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            margin="normal"
                            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                            helperText={formik.touched.quantity && formik.errors.quantity} />
                        <DialogActions>
                            <Button type="submit" color="primary">Update</Button>
                            <Button onClick={() => setOpenUpdateModal(false)} color="secondary">Cancel</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

        </Box>
    )
}
