import { Avatar, Badge, Box, IconButton } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Navbar.css'
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { store } from '../State/store';

export const Navbar = () => {
    const {auth}=useSelector(store=>store)
    const navigate = useNavigate();
    const handleAvatarClick = () => {
        if(auth.user?.role==="role_shopOwner"){
            navigate("/my-profile")
        }
        else{
            navigate("/admin/")
        }
    }

    return (
        <Box className='px-5 sticky top-0 z-50 py-[.8rem] bg-[#9377EE] lg:px-20 flex justify-between'>
                <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
                    <li onClick={()=>navigate("/items")} className='logo font-semibold text-gray-300 text-2xl'>
                        ShopMate
                    </li>
                </div>
                <div className='flex items-center space-x-2 lg:space-x-10'>
                    {/* <div className=''>
                        <IconButton>
                            <SearchIcon sx={{fontSize:"1.5rem"}}/>
                        </IconButton>
                    </div> */}
                    <div className=''>
                        {auth.user?(<Avatar onClick={handleAvatarClick} sx={{bgcolor:"white",color:"#9377EE"}}>{auth.user?.name[0].toUpperCase()}</Avatar>):(<IconButton onClick={()=>navigate("/account/login")}><Person/></IconButton>)}
                    </div>  
                    <div className=''>
                        <IconButton>
                            <Badge color="secondary" badgeContent={0}>
                                <IconButton onClick={()=>navigate("/cart")}><ShoppingCartIcon sx={{fontSize:"1.5rem"}}/></IconButton>
                            </Badge>
                        </IconButton>
                    </div>  


                </div>


        </Box>
    )
}    

export default Navbar;