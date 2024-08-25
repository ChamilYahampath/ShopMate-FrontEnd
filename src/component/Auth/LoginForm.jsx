import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../State/Authentication/Action";
import * as Yup from 'yup';

const initialValues = {
    email:"",
    password:""
};

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required")
});

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = (values) => {
       dispatch(loginUser({userData:values,navigate}));
    }
    return (
        <div>
            <Typography variant='h5' className="text-center">
                Login
            </Typography>

            <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            {({ errors, touched }) => (
                <Form>
                    <Field as={TextField} name="email" label="Email" fullWidth variant="outlined" margin="normal" error={touched.email && !!errors.email} helperText={touched.email && errors.email}/>
                    <Field as={TextField} name="password" label="Password" type="password" fullWidth variant="outlined" margin="normal" error={touched.password && !!errors.password} helperText={touched.password && errors.password}/>
                    <Button sx={{mt:2,padding:"0.5rem"}} fullWidth type="submit" variant="contained">Login</Button>
                </Form>
            )}
            </Formik>
            <Typography variant="body2" align="center" sx={{mt:3}}>
                Don't have an account? 
                <Button size="small" onClick={()=>navigate("/account/register")}> 
                    Register
                </Button>
            </Typography>
        </div>
    );
}

export default LoginForm;