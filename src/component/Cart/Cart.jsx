import React from "react";
import { CartItem } from "./CartItem";
import { Box, Button, Card, Divider, Grid, Modal, TextField } from "@mui/material";
import { AddressCard } from "./AddressCard";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { Field, Form, Formik } from "formik";
import { findUserCart,findShopByUserId } from "../../ApiService/Api";
import { useEffect } from "react";
import { useFormik } from 'formik'
import Swal from "sweetalert2";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getShopByUserId } from "../../ApiService/Api";
import { createOrder,clearCart } from "../../ApiService/Api";

//import { ErrorMessage, Field, Formik } from "formik";
//import * as Yup from "yup";

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline: 'none',
    boxShadow: 24,
    p: 4,
};
// const initialValues = {
//     streetAddress: "",
//     city: "",
//     province: "",
//     postalCode: ""
// }
 //this hook will be called only once when the component is mounted
/*const validationSchema = Yup.object({
    streetAddress: Yup.string().required("Street Address is required"),
    city: Yup.string().required("City is required"),
    province: Yup.string().required("Province is required"),
    postalCode: Yup.string().required("Postal Code is required")
});*/


const Cart = () => {
    const createOrderUsingSelectedAddress = () => {};
    const handleOpenAddressModal = () => setOpen(true);
    const [open, setOpen] = React.useState(false);
    const [shopId, setShopId] = React.useState(false);
    const handleClose = () => setOpen(false);
    const { shop } = useSelector((store) => store);
    const [additionalInfo, setAdditionalInfo] = useState('');
    const handleSubmit = (value) => {
        console.log("Form value", value); 
    }; 

   

    const handleAdditionalInfoChange = (event) => {
        setAdditionalInfo(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
        const response = await findUserCart();

        setItems(response.data);
        console.log("--------------",  response.data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
        const response = await getShopByUserId();
        
        if (response?.data) {
            setShopId( response.data.content.id);
          console.log("##########################",   response.data.content.id);
        }
    };
    fetchData();
}, []);

    const formik = useFormik({
        initialValues: {
            streetAddress: "",
            city: "",
            province: "",
            postalCode: "",
            description:"",
        },
            
        onSubmit:async (values) => {
           Swal.fire({
            icon : "warning",
            title : "Are you sure ?",
            text: "Going to add new order",
            showConfirmButton: true,
           }).then(async(result)=>{
            if (result.isConfirmed) {
                try {
                    const orderData = {
                        shopId: shopId, 
                        deliveryAddress: addresses,
                        description: additionalInfo
                    };
                    const res = await createOrder(orderData);
                    if(res?.data?.code == "00"){
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: res?.message,
                        }).then(async () => {
                            await clearCart();
                            setItems([]); 
                            window.location.href = '/my-profile/orders';
                        });
                    }else if (res?.data?.code === "11"){
                        Swal.fire({
                            icon:'error',
                            title:"Opps..",
                            text:res?.message,
                        })
                    } else if (res?.data?.code === "10"){
                        Swal.fire({
                            icon:'error',
                            title:"Opps..",
                            text:res?.message,
                        })
                    } 
                } catch (error) {
                    console.error("Order creation error:", error);
                    Swal.fire({
                        icon: 'error',
                        title: "Insufficient stock for item",
                        text: "Something went wrong. Please try again later.",
                    });
                }   
            }
    
        })
           
    },
});
    
    const [items,setItems] = React.useState([]);
    const [addresses, setAddresses] = useState([]);

      

    useEffect(() => {
        const fetchData = async () => {
        const response = await findShopByUserId();
      //  console.log("--------------",  response.data.content.address);
        setAddresses(response.data.content.address);
        }
        fetchData();
    }, []);

    return(
        <div>
            <main className="lg:flex justify-between">
                <section className="lg:w-[40%] space-y-6 lg:min-h-screen pt-10">
                {items?.items?.map((item) => (<CartItem data ={item} />))}
                <Divider/>
                    <div className="billDetails px-5 text-2xl">
                        <p className="font-extralight py-5">Bill Details</p>
                        <div className="flex justify-between text-gray-400 text-xl">
                                <p>Total Items</p>
                                <p>{items.totalItems}</p>
                        </div>
                        <div className="flex justify-between text-gray-400 text-xl">
                                <p>Total Bill</p>
                                <p>Rs.{items.totalPrice}.00</p>
                        </div>
                        <div  className="pt-10">
                            <TextField label="Additional Info" variant="outlined" fullWidth multiline rows={4} value={additionalInfo} onChange={handleAdditionalInfoChange} className="mb-4 " />
                        </div>
                        <div className="pb-10 pt-10">
                            <Button className="" variant="contained" fullWidth onClick={formik.handleSubmit} >Confirm Order</Button>
                        </div>
                    </div>
                    
                </section>
                <Divider orientation="vertical" flexItem />
                <section className="lg:w-[60%] flex justify-center px-5 pb-10 lg:pb-0">
                    <div>
                        <h1 className="text-center font-semibold text-2xl py-10">Delivery Address</h1>
                        <div className="flex gap-5 flex-wrap justify-center">
                          
                                <AddressCard handleSelectAddress={createOrderUsingSelectedAddress} item={addresses} showButton={true}/>
                            
                            {/* <Card className="flex gap-5 w-64 p-5">
                                <AddLocationAltIcon/>
                                <div className="space-y-3 text-gray-500">
                                    <h1 className="font-semibold text-lg text-white">Add New Address</h1>
                                    <Button variant="contained" fullWidth onClick={handleOpenAddressModal}>Add</Button>
                                </div>
                            </Card>   */}
                        </div>
                    </div>
                </section>      
            </main>
            {/* <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field as={TextField} name="streetAddress" label="Street Address" fullWidth variant="outlined" /> 
                                </Grid>
                                <Grid item xs={12}>
                                    <Field as={TextField} name="city" label="City" fullWidth variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field as={TextField} name="province" label="Province" fullWidth variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field as={TextField} name="postalCode" label="Postal Code" fullWidth variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button fullWidth variant="contained" type="submit">Add Address</Button>
                                </Grid>
                            </Grid> 
                    </Form>            
                </Formik>
            </Box>
            </Modal>      */}
        </div>
    )
}

export default Cart;