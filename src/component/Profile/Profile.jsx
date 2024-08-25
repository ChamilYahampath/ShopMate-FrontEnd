import React, {useState} from 'react'
import { ProfileNavBar } from './ProfileNavBar';
import { Route, Routes } from 'react-router-dom';
import Address from './Address';
import Payments from './Payments';
import Orders from './Orders';
import { ShopDetails } from './ShopDetails';
import ProfileUser from './ProfileUser';
import Feedbacks from './Feedbacks';


const Profile = () => {
    const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div className='lg:flex justify-between'>
        <div className='sticky h-[80vh] lg:w-[20%]'>
            <ProfileNavBar open={openSideBar}/>

        </div>  
        <div className='lg:w-[80%]'>
          <Routes>
            <Route path='/' element={<ProfileUser/>}/>
            <Route path='/orders' element={<Orders/>}/>  
            <Route path='/address' element={<Address/>}/>
            <Route path='/payments' element={<Payments/>}/>
            <Route path='/feedbacks' element={<Feedbacks/>}/>
            <Route path='/shop' element={<ShopDetails/>}/>
          </Routes>
        </div>
    </div>
  )
}


export default Profile;