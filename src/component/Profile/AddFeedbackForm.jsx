import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, CircularProgress, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AddPhotoAlternate, Close as CloseIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { uploadImageToCloudinary } from '../../AdminComponent/Util/UploadToCloudinary';
import { createFeedback } from '../../ApiService/Api';
import { getUsersOrders } from 'C:/Chamil/E/MIT/SDP/frontend/shopmate/src/component/State/Order/Action';

const AddFeedbackForm = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const [displayedOrderDate, setDisplayedOrderDate] = useState(''); // State for displaying order date
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const { order } = useSelector((store) => store);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      feedbackDate: '', // Assuming you're not submitting feedbackDate either
      deliverDate: null,
      orderId: '',
      rating: '3',
      images: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().max(50, 'Maximum is 50 characters').required('Required'),
    }),
    onSubmit: async (values) => {
      // Ensure orderDate is not included in values submitted
      const { orderDate, ...submitValues } = values;

      console.log("Feedback Request:", submitValues);
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'Going to add new feedback.',
        showConfirmButton: true,
      }).then(async () => {
        const res = await createFeedback(submitValues);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: res?.message,
            showConfirmButton: true,
          }).then(() => {
            window.location.reload();
        })
      });
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadImageToCloudinary(file);
    formik.setFieldValue('images', [...formik.values.images, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue('images', updatedImages);
  };

  useEffect(() => {
    dispatch(getUsersOrders(jwt));
  }, [dispatch, jwt]);

  const handleOrderChange = (event) => {
    const selectedOrderId = event.target.value;
    const selectedOrder = order.orders.find(item => item.id === selectedOrderId);

    if (selectedOrder) {
      const orderDate = new Date(selectedOrder.orderDate);
      const formattedOrderDate = orderDate.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        
    });
      // Update displayedOrderDate state for UI display only
      setDisplayedOrderDate(formattedOrderDate);

      formik.setFieldValue('orderId', selectedOrder.id);

      console.log("Order ID: " + selectedOrder.id);
    } else {
      console.error("Order not found");
    }
  };

  return (
    <div className='py-10 px-5 lg:flex items-center justify-center min-h-screen'>
      <div className='lg:max-w-4xl'>
        <h1 className='font-bold text-2xl text-center py-2'>Add New Feedback</h1>
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          <Grid container spacing={2}>
            <Grid className='flex flex-wrap gap-5' item xs={12}>
              <input
                accept='image/*'
                id='fileInput'
                style={{ display: 'none' }}
                onChange={handleImageChange}
                type='file'
              />
              <label className='relative' htmlFor='fileInput'>
                <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600'>
                  <AddPhotoAlternate className='text-white' />
                </span>
                {uploadImage && (
                  <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                    <CircularProgress />
                  </div>
                )}
              </label>
              <div className='flex flex-wrap gap-2'>
                {formik.values.images.map((image, index) => (
                  <div key={index} className='relative'>
                    <img className='w-24 h-24 object-cover' src={image} alt='' />
                    <IconButton
                      size='small'
                      sx={{ position: 'absolute', top: 0, right: 0, outline: 'none' }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <CloseIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='name'
                name='name'
                label='Name'
                variant='outlined'
                {...formik.getFieldProps('name')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='description'
                name='description'
                label='Description'
                variant='outlined'
                {...formik.getFieldProps('description')}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id='order-id-label'>Order Id</InputLabel>
                <Select
                  labelId='order-id-label'
                  id='orderId'
                  value={formik.values.orderId}
                  label='Order Id'
                  onChange={handleOrderChange}
                >
                  {order.orders?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.id}-{item.status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                label='Order Date'
                variant='outlined'
                value={displayedOrderDate} // Use displayedOrderDate for UI display
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  maxDate={new Date()}
                  label='Delivery Date'
                  value={formik.values.deliverDate}
                  onChange={(date) => formik.setFieldValue('deliverDate', date)}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl component='fieldset'>
                <FormLabel component='legend'>Feedback Rating</FormLabel>
                <RadioGroup
                  row
                  aria-label='rating'
                  name='rating'
                  value={formik.values.rating}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel value='1' control={<Radio />} label='1.0' />
                  <FormControlLabel value='2' control={<Radio />} label='2.0' />
                  <FormControlLabel value='3' control={<Radio />} label='3.0' />
                  <FormControlLabel value='4' control={<Radio />} label='4.0' />
                  <FormControlLabel value='5' control={<Radio />} label='5.0' />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Button className='mt-4' variant='contained' color='primary' type='submit'>
            Add
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddFeedbackForm;
