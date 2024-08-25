import { AddPhotoAlternate, Upload } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import CircularProgress from '@mui/material/CircularProgress'
import { uploadImageToCloudinary } from '../../AdminComponent/Util/UploadToCloudinary'
import { useDispatch } from 'react-redux'
import { createShop } from '../State/Shop/Action'



const initialValues = {
    name:'',
    openingHours:'',
    description:'',
    shopOwner:'',
    province:'',
    city:'',
    street:'',
    postalCode:'',
    email:'',
    mobile:'',
    instagram:'',
    facebook:'',
    twitter:'',
    linkedin:'',
    images:[]
}

const CreateShopForm = () => {
    const [uploadImage,setUploadImage] = useState(false);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');
   
    const formik=useFormik({
        initialValues,
        onSubmit: (values) =>{
            const data = {
                name:values.shopName,
                openingHours:values.openingHours,
                description:values.description,
                shopOwner:values.shopOwner,
                address:{
                province:values.province,
                city:values.city,
                street:values.street,
                postalCode:values.postalCode
                },
                contact:{
                email:values.email,
                mobile:values.mobile,
                instagram:values.instagram,
                facebook:values.facebook,
                twitter:values.twitter,
                linkedin:values.linkedin
                },
                images:values.images
            };
            {/*dispatch(createShop({data,token:jwt}));*/}
           
            dispatch(createShop({ data, token: jwt })).then(() => {
                window.location.href = 'my-profile/shop';
            });
        }
    })
    const handleImageChange= async(e) => {
        const file = e.target.files[0]
        setUploadImage(true)
        const image = await uploadImageToCloudinary(file)
        formik.setFieldValue('images',[...formik.values.images,image])
        setUploadImage(false)
    };

    const handleRemoveImage=(index)=>{
        const updatedImages=[...formik.values.images]
        updatedImages.splice(index,1);
        formik.setFieldValue('images',updatedImages)
    };

    return (
        <div className='py-10 px-5 lg:flex items-center justify-center min-h-screen'>
            <div className='lg:max-w-4xl'>
            <h1 className='font-bold text-2xl text-center py-2'>
                Add New Shop
            </h1>
            <form onSubmit={formik.handleSubmit} className='space-y-4'>
                <Grid container spacing={2}>
                    <Grid className='flex flex-wrap gap-5' item xs={12}>
                        <input accept='image/*' id='fileInput' style={{display:"none"}} onChange={handleImageChange} type='file'/>  
                        <label className='relative' htmlFor='fileInput'>
                            <span className='w-24 h-24 cursor-pointer flex items-center justify p-3 border rounded-md border-gray-600'>
                                <AddPhotoAlternate className='text-white'/>
                            </span>
                            {
                                uploadImage && <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                                    <CircularProgress/>
                                </div>                                
                            }
                        </label>
                        <div className='flex flex-wrap gap-2'>
                            {formik.values.images.map((image,index)=><div className='relative'>
                                <img 
                                className='w-24 h-24 object-cover'
                                key={index}
                                    src={image} alt=""/>
                                    <IconButton 
                                    size='small'
                                    sx={{
                                        position:'absolute',
                                        top:0,
                                        right:0,
                                        outline:"none"
                                    }}
                                    onClick={()=>handleRemoveImage(index)}>
                                        <CloseIcon sx={{fontSize:"1rem"}}/>
                                    </IconButton>
                            </div>)}
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth
                        id='shopName'
                        name='shopName'
                        label='Shop Name'
                        variant='outlined'
                        onChange={formik.handleChange}
                        value={formik.values.shopName}>

                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth
                        id='description'
                        name='description'
                        label='Description'
                        variant='outlined'
                        onChange={formik.handleChange}
                        value={formik.values.description}>

                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField fullWidth
                        id='shopOwner'
                        name='shopOwner'
                        label='Shop Owner'
                        variant='outlined'
                        onChange={formik.handleChange}
                        value={formik.values.shopOwner}>

                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField fullWidth
                        id='openingHours'
                        name='openingHours'
                        label='Opening Hours'
                        variant='outlined'
                        onChange={formik.handleChange}
                        value={formik.values.openingHours}>

                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth
                        id='street'
                        name='street'
                        label='Street'
                        variant='outlined'
                        onChange={formik.handleChange}
                        value={formik.values.street}>

                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <TextField fullWidth
                        id='city'
                        name='city'
                        label='City'
                        variant='outlined'
                        onChange={formik.handleChange}
                        value={formik.values.city}>

                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <TextField fullWidth
                        id='province'
                        name='province'
                        label='Province'
                        variant='outlined'
                        onChange={formik.handleChange}
                        value={formik.values.province}>

                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <TextField fullWidth
                        id='postalCode'
                        name='postalCode'
                        label='Postal Code'
                        variant='outlined'
                        onChange={formik.handleChange}
                        value={formik.values.postalCode}>

                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField fullWidth
                        id='email'
                        name='email'
                        label='Email'
                        variant='outlined'
                        onChange={formik.handleChange}
                        value={formik.values.email}>

                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField fullWidth
                        id='mobile'
                        name='mobile'
                        label='Mobile'
                        variant='outlined'
                        onChange={formik.handleChange}
                        value={formik.values.mobile}>

                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField fullWidth
                        id='instagram'
                        name='instagram'
                        label='Instagram'
                        variant='outlined'
                        onChange={formik.handleChange}
                        value={formik.values.instagram}>

                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField fullWidth
                        id='facebook'
                        name='facebook'
                        label='Facebook'
                        variant='outlined'
                        onChange={formik.handleChange}
                        value={formik.values.facebook}>

                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField fullWidth
                        id='twitter'
                        name='twitter'
                        label='Twitter'
                        variant='outlined'
                        onChange={formik.handleChange}
                        value={formik.values.twitter}>

                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField fullWidth
                        id='linkedin'
                        name='linkedin'
                        label='Linkedin'
                        variant='outlined'
                        onChange={formik.handleChange}
                        value={formik.values.linkedin}>

                        </TextField>
                    </Grid>
                </Grid>
                <Button className='mt-4' variant='contained' color='primary' type='submit'>Create Shop</Button>
            </form>
            </div>    
        </div>
    )
}


export default CreateShopForm