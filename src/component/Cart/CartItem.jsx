import { IconButton, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { updateCartItem, findUserCart,findShopByUserId,removeCartItem } from "../../ApiService/Api";

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Swal from 'sweetalert2';

export const CartItem = ({data}) => {

    const [quantity, setQuantity] = useState(data.quantity);
    const jwt = localStorage.getItem("jwt");
    const handleIncrement = () => {
        const newQuantity = quantity + 1;
        if (newQuantity <= data.item.quantity) {
            updateQuantity(newQuantity);
        }  
    };

    const handleDecrement = () => {
        const newQuantity = quantity - 1;
        if (newQuantity >= 1) {
            updateQuantity(newQuantity);
        }
    };

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        if (!isNaN(newQuantity) && newQuantity > 0 && newQuantity <= data.item.quantity) {
            updateQuantity(newQuantity);
        }
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //     const response = await findUserCart();

    //     setItems(response.data);
    //     console.log("--------------",  response.data);
    //     }
    //     fetchData();
    // }, []);



    const updateQuantity = async (newQuantity) => {
       
        try {
            const response = await updateCartItem({ cartItemId: data.id, quantity: newQuantity });
            if (response.status === 200) {
                setQuantity(newQuantity);
                console.log("updated qty"+newQuantity);
            } else {
                console.error('Failed to update quantity');
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        } finally {
            window.location.reload();
        }
    };
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
                removeCartItem(id)
                
                    .then(() => {
                     
                        Swal.fire({
                            title: 'Removed!',
                            text: 'The item has been removed from cart.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        }); 
                    })
                    .catch((error) => {
                        console.error("Error removing item from cart.", error);
                        Swal.fire(
                            'Error!',
                            'There was an error removing item from cart.',
                            'error'
                        );
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'The item is safe. ',
                    'error'
                );
            }
        });
    };

    return(
        <div className="px-5">
            <div className="lg:flex items-center lg:space-x-5">
                <div>
                    <img className="w-[5rem] h-[5rem] object-cover" src={data?.item?.images} alt="" />
                </div>
                <div className="flex items-center justify-between lg:w-[80%]">
                    <div className="space-y-1 lg:space-y-3 w-full">
                        <p>{data?.name}</p>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-1">
                                <IconButton>
                                    <RemoveCircleOutlineIcon onClick={handleDecrement}/>
                                </IconButton>
                                <TextField
                                    type="number"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    inputProps={{ min: 1, max: data.item.quantity }}
                                    variant="outlined"
                                    size="small"
                                    className="w-20"
                                />
                                
                                <IconButton>
                                    <AddCircleOutlineIcon onClick={handleIncrement} />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-1 lg:space-y-3 w-full">
                    <p>{data?.item?.quantity} items available</p>
                    </div>
                    <p>Rs.{data?.totalPrice}.00</p>
                   <div className="pl-5"> <IconButton onClick={() => handleDelete(data?.id)}><Delete /></IconButton></div>
                </div>
            </div>
        </div>
    )
}