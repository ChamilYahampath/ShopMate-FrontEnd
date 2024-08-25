import logo from './logo.svg';
import './App.css';
import { Navbar } from './component/Navbar/Navbar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './Theme/DarkTheme';
import Home from './component/Home/Home';
import Item from './component/Item/Item';
import Footer from './component/Footer/Footer';
import MultiItemCarousel from "./component/Home/HomeItemCarousel";
import Cart from './component/Cart/Cart';
import Profile from './component/Profile/Profile';
import CustomerRoute from './Routers/CustomerRoute';
import { useDispatch, useSelector } from 'react-redux';
import { store } from './component/State/store';
import { useEffect } from 'react';
import { getUser } from './component/State/Authentication/Action';
import { findCart } from './component/State/Cart/Action';
import { getShopByUserId } from './component/State/Shop/Action';
import Routers from './Routers/Routers';

function App() {
  const dispatch = useDispatch();
  const jwt=localStorage.getItem('jwt');
  const {auth}=useSelector(store=>store);

  useEffect(()=>{
    dispatch(getUser(auth.jwt || jwt));
    dispatch(findCart(jwt));
  },[auth.jwt]);


  return (
    <div>
        <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {/*<Navbar />*/}
        {/*<Home />*/}
        {/*<Item/>*/}
        {/*<MultiItemCarousel />*/}
        {/*<Cart />*/} 
        {/*<Profile />*/}
        {/*<Footer />*/}
        <Routers />
        </ThemeProvider>
    </div>
  );
}

export default App;
