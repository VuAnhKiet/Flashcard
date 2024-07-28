import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useContext } from 'react'
import * as Yup from "yup";
import axios from "axios";
import SetCard from "../component/setOfcards/setofcardlist";
import { useEffect, useState } from "react";
import AuthContext from "../AuthContext";

function CreateSetCard() {
    const [Cardstheme, SetCardstheme] = useState([]);
    const { auth, Setauth } = useContext(AuthContext);

    useEffect(() => {
        if (auth) {
            axios.get(`http://localhost:3001/setcard`, {
                headers: { accessToken: localStorage.getItem("accessToken") }
            }).then((res) => {
                SetCardstheme(res.data);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [auth]);

    const del = (e, id) => {
        e.stopPropagation();
        axios.delete(`http://localhost:3001/setcard/${id}`, {
            headers: {
                accessToken: localStorage.getItem('accessToken'),
            }
        }).then(() => {
            SetCardstheme(Cardstheme.filter((val) => {
                return val.id != id;
            }))
        })
    }

    const initialValues = {
        name: "",
    };
    
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("You must input a name"),
    });

    const onSubmit = (data, { resetForm }) => {
        axios.post("http://localhost:3001/setcard", data, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then((response) => {
            if (response.data.error) {
                console.log(response.data.error)
                alert('Please login to continue!')
            } else {
                console.log(response.data);
                SetCardstheme([...Cardstheme, response.data])
            }
        });
        resetForm();
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
            <SetCard Cardstheme={Cardstheme} del={del} auth={auth} />
        </div>
    );
}

export default CreateSetCard;