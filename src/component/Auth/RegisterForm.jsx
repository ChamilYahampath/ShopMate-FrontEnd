import React from "react";
import { Button, Select, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { registerUser } from "../State/Authentication/Action";
import * as Yup from "yup";

const initialValues = {
    name:"",
    email:"",
    password:"",
    role:"",
    address:"",
    contact:"",
    nic:""
}

const validationSchema = Yup.object({
    name: Yup.string()
        .required("Required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    role: Yup.string()
        .required("Required"),
    address: Yup.string()
        .required("Required"),
    contact: Yup.string()
        .matches(/^[0-9]{10}$/, "Contact must be a 10-digit number")
        .required("Required"),
    nic: Yup.string()
        .required("Required")
});

const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = (values) => {
        dispatch(registerUser({userData:values,history:navigate("/account/login")}));
        console.log("form valuues",values);
    }
    return (
        <div>
            <Typography variant='h5' className="text-center">
                Register
            </Typography>

            <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            {({ errors, touched }) => (
                <Form>
                    <Field as={TextField} name="name" label="Full Name" fullWidth variant="outlined" margin="normal" size="small" error={touched.name && !!errors.name} helperText={touched.name && errors.name}/>
                    <Field as={TextField} name="email" label="Email" fullWidth variant="outlined" margin="normal" size="small" error={touched.email && !!errors.email} helperText={touched.email && errors.email}/>
                    <Field as={TextField} name="password" label="Password" type="password" fullWidth variant="outlined" margin="normal" size="small" error={touched.password && !!errors.password} helperText={touched.password && errors.password}/>
                    <FormControl fullWidth margin="normal" size="small" error={touched.role && !!errors.role}>
                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                        <Field as={Select} labelId="demo-simple-select-label" id="demo-simple-select" name="role" label="Role">
                            <MenuItem value={"role_shopOwner"}>Shop Owner</MenuItem>
                            <MenuItem value={"role_companyOwner"}>Company Owner</MenuItem>
                            <MenuItem value={"role_employee"}>Employee</MenuItem>
                        </Field>
                        {touched.role && errors.role && <Typography color="error" variant="caption">{errors.role}</Typography>}
                    </FormControl>
                    <Field as={TextField} name="address" label="Address" fullWidth variant="outlined" margin="normal" size="small" error={touched.address && !!errors.address} helperText={touched.address && errors.address}/>
                    <Field as={TextField} name="contact" label="Contact" fullWidth variant="outlined" margin="normal" size="small" error={touched.contact && !!errors.contact} helperText={touched.contact && errors.contact}/>
                    <Field as={TextField} name="nic" label="NIC" fullWidth variant="outlined" margin="normal" size="small" error={touched.nic && !!errors.nic} helperText={touched.nic && errors.nic}/>
                    <Button sx={{mt:2,padding:"0.5rem"}} fullWidth type="submit" variant="contained">Register</Button>
                </Form>
            )}
            </Formik>
            <Typography variant="body2" align="center" sx={{mt:3}}>
                Do you have an account already? 
                <Button size="small" onClick={()=>navigate("/account/login")}> 
                    Login
                </Button>
            </Typography>
        </div>
    );
}

export default RegisterForm;