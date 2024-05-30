import React from 'react'
import * as Yup from "yup";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from 'react-router-dom'
function Registration() {
    const initialValues = {
        fullname: "",
        password:"",
        email:"",
    };
    const validationSchema = Yup.object().shape({
        fullname: Yup.string().required("You must input a name"),
        password: Yup.string().required("You must input a password"),
        email: Yup.string().required("You must input an email"),
    });
    const onSubmit=(data, { resetForm })=>{
        axios.post("http://localhost:3001/auth",data).then((res)=>{
            console.log(data);
            resetForm();
        })
    }
  return (
    <div className="body">
            <div className="main">
            <h1 className='h1'>REGISTER</h1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    <Form>
                        <label className='reglabel'>Username: </label>
                        <ErrorMessage name="fullname" component="span" className='span'/>
                        <Field
                            autoComplete="off"
                            id="input"
                            name="fullname"
                            className="input"   
                            placeHolder="Username"
                        />
                        <label className='reglabel'>Password: </label>
                        <ErrorMessage name="password" component="span" className='span' />
                        <Field
                            autoComplete="off"
                            id="input"
                            type="password"
                            name="password"
                            className="input"
                            placeHolder="New password"
                        />
                        <label className='reglabel'>Email: </label>
                        <ErrorMessage name="email" component="span" className='span' />
                        <Field
                            autoComplete="off"
                            id="input"
                            name="email"
                            className="input"
                            placeHolder="Email address"
                        />
                        <div className='wrap'>
                        <button className="button" type="submit" >Register</button>
                        </div>

                    </Form>
                </Formik>
                <p>
                    Already has an account?
                    <Link style={{ textDecoration: 'none' }} to='/login'>Back to login</Link>
                    </p>
            </div>
            
        </div>
  )
}

export default Registration