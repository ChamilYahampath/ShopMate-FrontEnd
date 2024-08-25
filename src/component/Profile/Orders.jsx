import React from "react";
import OrderCard from "./OrderCard";
import { getOrderHistory } from "../../ApiService/Api";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from "@mui/material/TextField";

const Orders = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    useEffect(() => {
        const fetchData = async () => {
        const response = await getOrderHistory();
        console.log("order history",  response.data);
        setOrderHistory(response.data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        let filteredOrders = orderHistory;

        if (startDate && endDate) {
            filteredOrders = filteredOrders.filter(order => {
                const orderDate = new Date(order.orderDate);
                const endDateWithTime = new Date(endDate);
                endDateWithTime.setHours(23, 59, 59, 999);
                return orderDate >= startDate && orderDate <= endDateWithTime;
            });
        }
        
        setFilteredOrders(filteredOrders);
    }, [orderHistory, startDate, endDate]);

    return(

        <div className="flex flex-col">
            <h1 className="text-3xl text-center py-7 font-bold">My Orders</h1>
            <hr className="w-1/2 mx-auto mb-7"/>
            <p className="text-center my-4">***If you want to cancel your order, please contact our customer support service within 2 working days. (Contact Number: 0773005000)</p>
            <Box display="flex" justifyContent="space-between" mb={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(date) => setStartDate(date)}
                renderInput={(params) => <TextField {...params} />}
                />
                
                <DatePicker
                label="End Date"
                value={endDate}
                onChange={(date) => setEndDate(date)}
                renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>
            </Box>
            
            <div className="flex items-center flex-col">
            <div className="space-y-5 w-full lg:w-1/2">
                {
                    filteredOrders.map((item) => <OrderCard  item={item}/>)
                }
            </div>    
            </div>
        </div>
    )
}

export default Orders;