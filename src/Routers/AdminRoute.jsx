import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Admin } from '../AdminComponent/Admin/Admin'

export const AdminRoute = () => {
    return(
        <div>
            <Routes>
                <Route path='/*'element={<Admin/>}></Route>
            </Routes>
        </div>
    )
}