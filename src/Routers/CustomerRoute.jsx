import React from "react";
import Navbar from "../component/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../component/Home/Home";
import Cart from "../component/Cart/Cart";
import Profile from "../component/Profile/Profile";
import Auth from "../component/Auth/Auth";
import Main from "../component/Home/Main";
import CreateShopForm from "../component/Shop/CreateShopForm";
import { useSelector } from "react-redux";
import { store } from "../component/State/store";
import ItemDetails from "../component/Item/ItemDetails";


export const CustomerRoute = () => {
    const { shop } = useSelector((store) => store);
    return(
        <div>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                {/* <Route path='/*' element={!shop.usersShop?<CreateShopForm/>:<Home/>}/> */}
                <Route path='/account/:register' element={<Home/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/my-profile/*' element={<Profile/>}/>
                <Route path='/main' element={<Main/>}/>
                <Route path='/items' element={<ItemDetails/>}/>
                <Route path='/createshop' element={<CreateShopForm/>}/>
            </Routes>
            <Auth/>
        </div>
    )
}
