import { Formik, Form, Field, ErrorMessage, } from "formik";
import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import axios from "axios";
import Card from "../component/flashcard/cardBaseonId";
import { useParams } from 'react-router-dom';
function CreateCard() {
    const [addNewCard, SetaddNewCard] = useState([]);
    const [ListOfCards, SetListOfCards] = useState([]);
    let { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:3001/setcard/byId/${id}`).then((res) => {
            SetListOfCards(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    const initialValues = {
        word: "",
        defination: "",
    };
    const validationSchema = Yup.object().shape({
        word: Yup.string().required("You must input a word"),
        defination: Yup.string().min(3).max(15).required("You must input a defination"),
    });

    const onSubmit = (data, { resetForm }) => {
        axios.post("http://localhost:3001/card", { word: data.word, defination: data.defination, groupCardId: id },
            {
                headers: { accessToken: sessionStorage.getItem("accessToken") }
            })
            .then((response) => {
                if(response.data.error){
                    console.log(response.data.error)
                } else{
                SetListOfCards([...ListOfCards, response.data]);
                console.log(response.data);
                }
            });
        resetForm();
    };

    return (
        <div className="">
            <div className="create-box">
                <h2>Create Flashcards</h2>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}

                >{({ handleChange, setFieldValue }) => (
                    <Form>
                        <label>Word: </label>
                        <ErrorMessage name="word" component="span" />
                        <Field
                            autoComplete="off"
                            id="input"
                            name="word"
                            // onChange={(event) => { SetnewWord(event.target.value)}}
                            onChange={e => setFieldValue('word', e.target.value)}

                        />
                        <label>Defination: </label>
                        <ErrorMessage name="defination" component="span" />
                        <Field
                            autoComplete="off"
                            id="input"
                            name="defination"
                            onChange={(e) => { setFieldValue("defination", e.target.value); }}
                        />
                        <button className="create" type="submit">Create</button>
                    </Form>)}
                </Formik>
            </div>
            <div><Card ListOfCards={ListOfCards} /></div>
        </div>
    );
}

export default CreateCard;