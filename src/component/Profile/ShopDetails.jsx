import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateShopStatus } from '../State/Shop/Action';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import CreateShopForm from '../Shop/CreateShopForm';
import { useEffect } from 'react';
import { getShopByUserId } from '../../ApiService/Api';

export const ShopDetails = () => {
    const jwt = localStorage.getItem("jwt");
    const { shop } = useSelector((store) => store);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [shops, setShops] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try{
            const response = await getShopByUserId();
            console.log("+++++++++++++",  response.data);
        if (response?.data) {
            setShops(response.data);
        }
        
        }catch(e){
            navigate("/createshop");
        }

        
    };
    fetchData();
    }, [dispatch]);


    const handleShopStatus = () => {
        dispatch(updateShopStatus({
            shopId: shops.content?.id,
            jwt: localStorage.getItem('jwt')
        }));
        window.location.reload();
    };


    // useEffect(() => {
    //     dispatch(getShopByUserId(jwt));
    // }, [dispatch, jwt]);


    return ( 
        <div className='lg:px-20 px-5 pb-10'>
            <div className='py-5 flex justify-center items-center gap-5'>
                <h1 className='text-2xl lg:text-7xl text-center font-bold'>
                    {shops.content?.name}
                </h1>
                <div>
                    <Button color={shops.shops?.status ? "secondary" : "secondary"} className='py-[1rem] px-[2rem]' variant='contained' onClick={handleShopStatus} size='large'>
                        {shops.content?.status ? "Close" : "Open"}
                    </Button>    
                </div>
                {/* <CardHeader action={<IconButton onClick={()=>navigate("/createshop")} aria-label="settings"><CreateIcon/></IconButton>} sx={{pt:2,alignments:"center"}}/> */}
            </div>
            
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title={<span className="text-gray-300">Shop Details</span>} />
                        <CardContent>
                            <div className='space-y-4 text-gray-200'>
                                <div className='flex'>
                                    <p className='w-48'>Shop Owner</p>
                                    <p className='text-gray-400'>
                                        <span className='pr-55'>- </span>
                                        {shops?.content?.owner?.name}
                                    </p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48'>Description</p>
                                    <p className='text-gray-400'>
                                        <span className='pr-55'>- </span>
                                        {shops.content?.description}
                                    </p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48'>Opening Hours</p>
                                    <p className='text-gray-400'>
                                        <span className='pr-55'>- </span>
                                        {shops.content?.openingHours}
                                    </p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48'>Status</p>
                                    <p className='text-gray-400'>
                                        <span className='pr-55'>- </span>
                                        {shops.content?.status ? <span className='px-5 py-2 rounded-full bg-green-400 text-gray-950'>Open</span> : <span className='px-5 py-2 rounded-full bg-red-400 text-gray-950'>Close</span>}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Card>
                        <CardHeader title={<span className="text-gray-300">Address</span>} />
                        <CardContent>
                            <div className='space-y-4 text-gray-200'>
                                <div className='flex'>
                                    <p className='w-48'>Province</p>
                                    <p className='text-gray-400'>
                                        <span className='pr-55'>- </span>
                                        {shops.content?.address?.province || "Not Provided"}
                                    </p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48'>City</p>
                                    <p className='text-gray-400'>
                                        <span className='pr-55'>- </span>
                                        {shops.content?.address?.city || "Not Provided"}
                                    </p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48'>Street</p>
                                    <p className='text-gray-400'>
                                        <span className='pr-55'>- </span>
                                        {shops.content?.address?.street || "Not Provided"}
                                    </p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48'>Postal Code</p>
                                    <p className='text-gray-400'>
                                        <span className='pr-55'>- </span>
                                        {shops.content?.address?.postalCode || "Not Provided"}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Card>
                        <CardHeader title={<span className="text-gray-300">Contact</span>} />
                        <CardContent>
                            <div className='space-y-4 text-gray-200'>
                                <div className='flex'>
                                    <p className='w-48'>Email</p>
                                    <p className='text-gray-400'>
                                        <span className='pr-55'>- </span>
                                        {shops.content?.contact?.email || "Not Provided"}
                                    </p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48'>Mobile</p>
                                    <p className='text-gray-400'>
                                        <span className='pr-55'>- </span>
                                        {shops.content?.contact?.mobile || "Not Provided"}
                                    </p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48'>Social</p>
                                    <div className='flex text-gray-400 items-center pb-3 gap-2'>
                                        <span className='pr-5'>-</span>
                                        <a href="/">
                                            <InstagramIcon sx={{ fontSize: "3rem" }} />
                                        </a>
                                        <a href="/">
                                            <TwitterIcon sx={{ fontSize: "3rem" }} />
                                        </a>
                                        <a href="/">
                                            <LinkedInIcon sx={{ fontSize: "3rem" }} />
                                        </a>
                                        <a href="/">
                                            <FacebookIcon sx={{ fontSize: "3rem" }} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid> 
        </div>
    );
};
