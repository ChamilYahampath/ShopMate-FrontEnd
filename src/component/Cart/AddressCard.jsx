import React, { useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Card } from "@mui/material";

export const AddressCard = ({ item }) => {
    const [selected, setSelected] = useState(false);

    return (
        <Card className="relative flex gap-5 w-64 p-5">
            <div className="absolute top-2 right-2">
                {selected && <CheckCircleIcon style={{ color: 'green' }} />}
            </div>
            <HomeIcon />
            <div className="space-y-3 text-gray-500">
                <h1 className="font-semibold text-lg text-white">Shop</h1>
                <p>{item.street}, {item.city}, {item.province}</p>
                <p>{item.postalCode}</p>
            </div>
        </Card>
    );
};

