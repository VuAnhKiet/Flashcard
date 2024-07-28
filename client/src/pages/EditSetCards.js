import React,{useState} from 'react'
import { Formik, Form, Field, ErrorMessage, } from "formik";
import * as Yup from "yup";
import axios from "axios";

function EditSetCards({ name, id, hide, setHide, setName }) {
    const initialValues = {
        name:name
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("You must input a name"),
    });
    
    const onSubmit = (data, { resetForm }) => {
        axios.put("http://localhost:3001/setcard", {name:data.name,id:id},{
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then((response) => {
            if(response.data.error){
                console.log(response.data.error)
                alert('Please login to continue!')
            } else{
                setName(data.name);
                setHide(!hide);
        }});
        resetForm();
    };
    return (
        <div className="">
            <div className="create-box">
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    <Form>
                        <label>Name: </label>
                        <ErrorMessage name="name" component="span" />
                        <Field
                            autoComplete="off"
                            id="input"
                            name="name"
                        />
                        <button type="submit" onClick={(e) => { e.stopPropagation(); setHide(!hide); }}>Close</button>
                        <button className="save" type="submit" onClick={(e) => { e.stopPropagation(); }} >Create</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default EditSetCards