import React from "react";
import { Button, Grid, Typography } from "@mui/material";

const Footer = () => {
    return (
        <div>
            <Grid className="bg-black text-white text-center mt-8" 
            container
            sx={{bgcolor:"black",color:"white",py:3}}
            >
                <Grid className="pt-20" item xs={12}>
                    <Typography variant="body-2" component="p" align="center">© 2024 ShopMate Ltd. All rights reserved.</Typography>
                </Grid>    
            </Grid>
        </div>
    )
}

export default Footer;