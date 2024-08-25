import { AddPhotoAlternate, Upload } from '@mui/icons-material'
import { Box, Button, Chip, FormControl, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import CircularProgress from '@mui/material/CircularProgress'
import { uploadImageToCloudinary } from '../Util/UploadToCloudinary'
import { useDispatch } from 'react-redux'
import { createItem } from '../../ApiService/Api'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllCategories } from 'C:/Chamil/E/MIT/SDP/frontend/shopmate/src/component/State/Category/Action'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import { getAllItems } from 'C:/Chamil/E/MIT/SDP/frontend/shopmate/src/component/State/Item/Action'
import { useNavigate } from 'react-router-dom'

// const initialValues = {
//     name:'',
//     description:'',
//     price:'',
//     category:'',
//     quantity:'',
//     images:[]
// }

const AddItemForm = () => {
    const [uploadImage,setUploadImage] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jwt = localStorage.getItem('jwt');
    const {category} = useSelector((store) => store);
    useEffect(() => {
        dispatch(getAllItems(jwt));
    }, [dispatch, jwt]);
    // const formik=useFormik({
    //     initialValues,
    //     onSubmit: (values) =>{
    //         const item = {
    //             name:values.name,
    //             price:values.price,
    //             description:values.description,
    //             category:values.category,
    //             quantity:values.quantity,
    //             images:values.images
    //         };
    //         dispatch(createItem({item:values,token:jwt}));
    //     }
    // })
    const formik = useFormik({
        initialValues: {
            name:'',
            description:'',
            price:'',
            category:'',
            quantity:'',
            images:[]
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(50, "Maximum is 50 characters")
                .required("Required"),
        }),
        onSubmit:async (values) => {
           //handleClose(false)
           Swal.fire({
            icon : "warning",
            title : "Are you sure ?",
            text: "Going to save new item",
            showConfirmButton: true,
           }).then(async()=>{
            const res = await createItem(values);
            console.log("create"+values);
             if(res?.data?.code == "00"){
                Swal.fire({
                    icon:'success',
                    title:"success",
                    text:res?.message,
                })
                dispatch(getAllItems(localStorage.getItem("jwt")));
                navigate(-1);
            }else if (res?.data?.code === "06"){
                Swal.fire({
                    icon:'error',
                    title:"Opps..",
                    text:res?.message,
                })
            } else if (res?.data?.code === "10"){
                Swal.fire({
                    icon:'error',
                    title:"Opps..",
                    text:res?.message,
                })
            }
           })
           
        },
    });
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

    useEffect(() => {
        dispatch(getAllCategories(jwt));
    },[]);

    return (
        <div className='py-10 px-5 lg:flex items-center justify-center min-h-screen'>
            <div className='lg:max-w-4xl'>
            <h1 className='font-bold text-2xl text-center py-2'>
                Add New Item
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
                        id='name'
                        name='name'
                        label='name'
                        variant='outlined'
                        {...formik.getFieldProps('name')}>

                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth
                        id='description'
                        name='description'
                        label='Description'
                        variant='outlined'
                        {...formik.getFieldProps('description')}>

                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField fullWidth
                        id='price'
                        name='price'
                        label='Price'
                        variant='outlined'
                        {...formik.getFieldProps('price')}>

                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formik.values.category}
                        label='category'
                        {...formik.getFieldProps('category')}
                        name='category'
                        >
                        {category.categories?.map((item)=><MenuItem key={item.id} value={item}>{item.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField fullWidth
                        id='quantity'
                        name='quantity'
                        label='Quantity'
                        variant='outlined'
                        {...formik.getFieldProps('quantity')}>

                        </TextField>
                    </Grid>
                </Grid>
                <Button className='mt-4' variant='contained' color='primary' type='submit'>Add</Button>
            </form>
            </div>    
        </div>
    )
}


export default AddItemForm;