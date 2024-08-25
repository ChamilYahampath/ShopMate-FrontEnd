import { Accordion, AccordionDetails, AccordionSummary, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
//import { addItemToCart } from "../State/Cart/Action";
import { addItemToCart } from "../../ApiService/Api";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import Swal from "sweetalert2";

const ItemCards = ({ item } ) => {
    const jwt = localStorage.getItem('jwt');
    // const dispatch = useDispatch();
    // const handleAddItemToCart = (e) => {
    //     e.preventDefault();
    //     const reqData = {
    //         token: localStorage.getItem("token"),
    //         cartItem: {
    //             itemId: item.id,
    //             quantity: 1
    //         }
    //     }
    //     dispatch(addItemToCart(reqData));
    //     console.log("Add to cart request data",reqData);
    // };

    const formik = useFormik({
        initialValues: {
            itemId:item.id,
            quantity:1,
        },
        onSubmit:async (values) => {
           Swal.fire({
            icon : "warning",
            title : "Are you sure ?",
            text: "Going to add item to cart",
            showConfirmButton: true,
           }).then(async()=>{
            const res = await addItemToCart(values);
            if(res?.data?.code == "00"){
                Swal.fire({
                    icon:'success',
                    title:"success",
                    text:res?.message,
                })
            }else if (res?.data?.code === "06"){
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
           })
           console.log("Add to cart request data",values);
        },
    });

    return(
        <div>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
            <div className="lg:flex items-center justify-between">
                <div className="lg:flex items-center lg:gap-5">
                    <img className="w-[7rem] h-[7rem] object-cover" src={item.images} alt={item.name}/>
                    <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
                        <p className="font-semibold text-xl">{item.name}</p>
                        <p className="text-sm">Rs.{item.price}.00</p>
                        <p className="text-sm">{item.quantity} items available</p>
                    </div>
                </div>
            </div>
        </AccordionSummary>
        <AccordionDetails>
            <form>
                <div className="flex flex-wrap gap-5">
                {item.description}
                </div>
                <div className="pt-5">
                    <Button onClick={formik.handleSubmit} variant="contained" type="submit" disabled={item.quantity==0} style={{ backgroundColor: item.quantity==0 ? 'red' : undefined, color: item.quantity==0 ? 'white' : undefined }}>{!item.quantity==0?"Add to Cart":"Out of Stock"}</Button>
                </div>
            </form>
        </AccordionDetails>
      </Accordion>
      </div>
    )
}

export default ItemCards;