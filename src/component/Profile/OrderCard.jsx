import React from "react";
import { Box, Button, Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const OrderCard = ({item}) => {

    return(
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Box className="w-full">
            <Box className="flex justify-between items-center">
              <Box>
                <Box mb={1}>
                <Typography variant="body2"><strong>Order ID:</strong> {item.id}</Typography>
                </Box>
                <Box mb={1}>
                <Typography variant="body2"><strong>Description:</strong> {item.description}</Typography>
                </Box>
                <Box mb={1}>
                <Typography variant="body2"><strong>Order Date:</strong> { new Date(item.orderDate).toISOString().split("T")[0]}</Typography>
                </Box>
                <Box mb={1}>
                <Typography variant="body2"><strong>Total Items:</strong> {item.totalItems}</Typography>
                </Box>
                <Box mb={1}>
                <Typography variant="body2"><strong>Total Price:</strong> Rs.{item.totalPrice}.00</Typography>
                </Box>
                <Box mb={1}>
                <Typography variant="body2"><strong>Delivery Address:</strong> {`${item.deliveryAddress.street}, ${item.deliveryAddress.city}, ${item.deliveryAddress.province}`}</Typography>
                </Box>
              </Box>
              <Button variant="contained" style={{ backgroundColor: item.status === 'Out of Stock' ? 'red' : undefined, color: item.status === 'Out of Stock' ? 'white' : undefined }}>
                {item.status}
              </Button>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6">Item Details</Typography>
          {item.items.map((itemDetail, index) => (
            <Box key={index} className="flex flex-wrap gap-5 mt-2" sx={{ mb: 2 }}>
              <img className="w-[7rem] h-[7rem] object-cover" src={itemDetail.item.images} alt={itemDetail.item.name} />
              <Box>
                <Typography variant="body2"><strong>Item Name:</strong> {itemDetail.item.name}</Typography>
                <Typography variant="body2"><strong>Quantity:</strong> {itemDetail.quantity}</Typography>
                <Typography variant="body2"><strong>Total Price:</strong> Rs.{itemDetail.totalPrice}.00</Typography>
              </Box>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
    );
}

export default OrderCard;