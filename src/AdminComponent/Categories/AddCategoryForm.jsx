import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createCategory } from 'C:/Chamil/E/MIT/SDP/frontend/shopmate/src/component/State/Category/Action';
import { Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { createNewCategory } from '../../ApiService/Api';
import { getAllCategories } from '../../component/State/Category/Action';
import { useEffect } from 'react';



const AddCategoryForm = ({handleClose,setReponse}) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    useEffect(() => {
        dispatch(getAllCategories(jwt));
    }, [dispatch, jwt]);
    const formik = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().max(50, "Maximum is 50 characters").required("Required"),
        }),
        onSubmit:async (values) => {
           handleClose(false)
           Swal.fire({
            icon : "warning",
            title : "Are you sure ?",
            text: "Going to save new catagory",
            showConfirmButton: true,
           }).then(async()=>{
            const res = await createNewCategory(values)
            if(res?.data?.code == "00"){
                Swal.fire({
                    icon:'success',
                    title:"success",
                    text:res?.message,
                })
                dispatch(getAllCategories(localStorage.getItem("jwt")));
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

  return (
    <div className=''>
        <div className='p-5'>
            <h1 className='text-gray-400 text-center text-xl pb-10'>Add Category</h1>
            <form onSubmit={formik.handleSubmit} className='space-y-4'>
                <TextField fullWidth
                        id='name'
                        name='name'
                        label='Category Name'
                        variant='outlined'
                        {...formik.getFieldProps('name')}
                        >
                </TextField>
                <p className='text-danger'>
                    {formik.touched.name && formik.errors.name}
                </p>
                <Button type='submit' variant='contained' color='primary' className='mt-5'>Add</Button>
            </form>
        </div>    
    </div>
  );
}

export default AddCategoryForm;