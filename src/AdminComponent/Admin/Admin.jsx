import React from 'react'
import { AdminSideBar } from './AdminSideBar'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from  '../Dashboard/Dashboard'
import { Orders } from '../Orders/Orders'
import { Items } from '../Items/Items'
import { Category } from '../Categories/Category'
import { Feedback } from '../Feedback/Feedback'
import { Delivery } from '../Delivery/Delivery'
import AddItemForm from '../Items/AddItemForm'
import ProfileUser from '../../component/Profile/ProfileUser'

export const Admin = () => {
    const handleClose = () => {
    }
    
    return (
        <div>
        <div className='lg:flex justify-between'>
                    <div>
                        <AdminSideBar handleClose={handleClose} />
                    </div>        
                    <div className='lg:w-[80%]'>
                        <Routes>
                            <Route path='/' element={<ProfileUser/>}/>
                            <Route path='/dashboard' element={<Dashboard/>}/>
                            <Route path='/orders' element={<Orders/>}/>
                            <Route path='/items' element={<Items/>}/>
                            <Route path='/category' element={<Category/>}/>
                            <Route path='/feedback' element={<Feedback/>}/>
                            <Route path='/delivery' element={<Delivery/>}/>
                            <Route path='/items/add-item' element={<AddItemForm/>}/>
                        </Routes>
                    </div>

        </div>
        </div>
    )
}