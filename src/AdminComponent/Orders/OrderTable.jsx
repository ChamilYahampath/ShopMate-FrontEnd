import React, { useEffect, useState } from "react";
import { Box, Card, CardHeader, Paper, Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, Select, Button, CircularProgress, Typography, TextField } from "@mui/material";
import { getAllOrders, updateOrderStatus } from '../../ApiService/Api';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export const OrderTable = ({ allOrdersProp, filterValue }) => {
    const [selectedStatus, setSelectedStatus] = useState("");
    const [allOrders, setAllOrders] = useState([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
  
    useEffect(() => {
      let filteredOrders = allOrdersProp;

      if (filterValue !== "ALL") {
        filteredOrders = filteredOrders.filter((order) => order.status.toString() === filterValue
      );
      }

      if (startDate && endDate) {
        filteredOrders = filteredOrders.filter(order => {
          const orderDate = new Date(order.orderDate);
          const endDateWithTime = new Date(endDate);
          endDateWithTime.setHours(23, 59, 59, 999);
          return orderDate >= startDate && orderDate <= endDateWithTime;
        });
      }
        
        setAllOrders(filteredOrders);
      
    }, [allOrdersProp, filterValue, startDate, endDate]);
  
    const handleStatusChange = (event, orderId) => {
      const newStatus = event.target.value;
      setSelectedStatus(newStatus);
      console.log(`Order ${orderId} status changed to: ${newStatus}`);
      updateOrderStatus(orderId, newStatus)
        .then(() => {
            window.location.reload();
        })
        .catch((error) => {
          console.error("Failed to update order status", error);
        });
    };
  
  
    return (
      <Box>
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
        <Card className="mt-1">
          {allOrders.map((order) => (
            <Accordion key={order.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Box className="w-full">
                  <Box className="flex justify-between items-center">
                    <Box>
                      <Box mb={1}>
                        <Typography variant="body2"><strong>Order ID:</strong> {order.id}</Typography>
                      </Box>
                      <Box mb={1}>
                        <Typography variant="body2"><strong>Description:</strong> {order.description}</Typography>
                      </Box>
                      <Box mb={1}>
                        <Typography variant="body2"><strong>Order Date:</strong> { new Date(order.orderDate).toISOString().split("T")[0]}</Typography>
                      </Box>
                      <Box mb={1}>
                        <Typography variant="body2"><strong>Total Items:</strong> {order.totalItems}</Typography>
                      </Box>
                      <Box mb={1}>
                        <Typography variant="body2"><strong>Total Price:</strong> Rs.{order.totalPrice}.00</Typography>
                      </Box>
                      <Box mb={1}>
                        <Typography variant="body2"><strong>Delivery Address:</strong> {`${order.deliveryAddress.street}, ${order.deliveryAddress.city}, ${order.deliveryAddress.province}`}</Typography>
                      </Box>
                    </Box>
                    <Box mb={1}>
                      <Select
                        value={selectedStatus || order.status}
                        onChange={(event) => handleStatusChange(event, order.id)}
                        style={{ minWidth: "120px" }}
                      >
                        <MenuItem value="PENDING">Pending</MenuItem>
                        <MenuItem value="DELIVERED">Delivered</MenuItem>
                        <MenuItem value="COMPLETED">Completed</MenuItem>
                        <MenuItem value="CANCELLED">Cancelled</MenuItem>
                        <MenuItem value="OUT_FOR_DELIVERY">
                          Out for delivery
                        </MenuItem>
                      </Select>
                    </Box>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="h6" gutterBottom>Item Details</Typography>
                {order.items.map((itemDetail, index) => (
                  <Box key={index} className="flex flex-wrap gap-5 mt-2" sx={{ mb: 2 }}>
                    <img className="w-[7rem] h-[7rem] object-cover" src={itemDetail.item.images} alt={itemDetail.item.name} />
                    <Box>
                      <Box mb={1}>
                        <Typography variant="body2"><strong>Item Name:</strong> {itemDetail.item.name}</Typography>
                      </Box>
                      <Box mb={1}>
                        <Typography variant="body2"><strong>Quantity:</strong> {itemDetail.quantity}</Typography>
                      </Box>
                      <Box mb={1}>
                        <Typography variant="body2"><strong>Total Price:</strong> Rs.{itemDetail.totalPrice}.00</Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Card>
      </Box>
    );
};
