import { Formik, Form, Field, ErrorMessage } from "formik";
import React from 'react'
import * as Yup from "yup";
import axios from "axios";
import SetCard from "../component/setOfcards/setofcard";
import { useEffect, useState } from "react";
function CreateSetCard() {
    const [Cardstheme, SetCardstheme] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3001/setcard`).then((res) => {
            SetCardstheme(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    const initialValues = {
        name: "",
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("You must input a name"),
    });

    const onSubmit = (data, { resetForm }) => {
        axios.post("http://localhost:3001/setcard", data).then((response) => {
            // if(response.data.error){
            //     console.log(response.data.error)
            // } else{
            console.log(response.data);
            SetCardstheme([...Cardstheme, response.data])
        });
        resetForm();
        window.location.reload(true);


    };
    return (
        <div className="">
            <div className="create-box">
                <h2>Create Set Card</h2>
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
                        <button className="create" type="submit" >Create</button>
                    </Form>
                </Formik>
            </div>
            <SetCard Cardstheme={Cardstheme} />
        </div>


    );
}

export default CreateSetCard;