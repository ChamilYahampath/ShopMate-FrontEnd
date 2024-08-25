import { Dashboard, ShoppingBag } from '@mui/icons-material'
import React from 'react'
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FeedbackIcon from '@mui/icons-material/Feedback';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../component/State/Authentication/Action';

const menu =[
    {title:"Dashboard", icon:<Dashboard/>, path:"/dashboard"},
    {title:"Orders", icon:<ShoppingBag/>, path:"/orders"},
    {title:"Items", icon:<InventoryIcon/>, path:"/items"},
    {title:"Category", icon:<CategoryIcon/>, path:"/category"},
    {title:"Feedback", icon:<FeedbackIcon/>, path:"/feedback"},
    {title:"Delivery", icon:<LocalShippingIcon/>, path:"/delivery"},
    {title:"Logout", icon:<LogoutIcon/>, path:"/"}
]

export const AdminSideBar = ({handleClose}) => {
    const isSmallScreen = useMediaQuery('(max-width:1080px)');
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleNavigate=(item) => {
        navigate(`/admin${item.path}`)
        if(item.title==="Logout"){
            navigate('/account/login')
            dispatch(logout())
            handleClose()
        }    
    }

    return (
        <div>
            <>
                <Drawer variant={isSmallScreen?"temporary":"permanent"} onClose={handleClose} open={true} anchor='left' sx={{zIndex:1}}>
                    <div className='w-[70vw] lg:w-[20vw] h-screen flex flex-col justify-center text-xl space-y-[1.65rem]'>
                        {menu.map((item, i)=><>
                        <div onClick={()=>handleNavigate(item)} className='px-5 flex items-center gap-5 cursor-pointer'>
                            {item.icon}
                            <span>{item.title}</span>
                        </div>
                        {i!==menu.length-1 && <Divider/>}
                        </>)}
                    </div>    
                </Drawer>
            </>
        </div>
    )
}