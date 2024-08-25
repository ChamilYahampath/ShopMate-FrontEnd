import React, { useEffect, useState } from "react";
import { Card, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { OrderTable } from "./OrderTable";
import { getAllOrders } from '../../ApiService/Api';


const orderStatus=[
    {label:"Pending",value:"PENDING"},
    {label:"Delivered",value:"DELIVERED"},
    {label:"Out for delivery",value:"OUT_FOR_DELIVERY"},
    {label:"Cancelled",value:"CANCELLED"},
    {label:"Completed",value:"COMPLETED"},
    {label:"All",value:"ALL"}
]

export const Orders = () => {
    const [filterValue, setFilterValue] = useState("ALL"); // Default to showing all feedbacks
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllOrders();
                if (Array.isArray(response.data)) {
                    setAllOrders(response.data);
                } else {
                    setAllOrders(response.data[0]);
                    console.log("00000000000000000000000000        "+response.data);
                   // throw new Error("Unexpected response format");
                    
                }
                console.log("all orders", response.data);
            } catch (e) {
                setError(e.message || "An error occurred while fetching orders");
            } finally {
                setLoading(false); // Set loading to false after the data is fetched
            }
        };
        fetchData();
    }, []);



    const handleFilter=(e,value)=>{
        setFilterValue(value);
    };

    return (
        <div className='px-2'>
            <Card className='p-5'>
                <Typography sx={{paddingBottom:"1rem"}} variant='h5'>Order Status</Typography>
                <FormControl>
                <RadioGroup onChange={handleFilter} row name='category' value={filterValue}>
                        {orderStatus.map((item) => (
                            <FormControlLabel
                                key={item.label}
                                value={item.value}
                                control={<Radio />}
                                label={item.label}
                                sx={{ color: "gray" }}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Card>
            <OrderTable allOrdersProp={allOrders} filterValue={filterValue}/>
        </div>
    )
}