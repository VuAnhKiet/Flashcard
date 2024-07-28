import { Formik, Form, Field, ErrorMessage, } from "formik";
import React, { useEffect, useState,useContext } from 'react'
import * as Yup from "yup";
import axios from "axios";
import Card from "../component/flashcard/cardBaseonId";
import { useParams } from 'react-router-dom';
import AuthContext from "../AuthContext";

function CreateCard() {
    const [addNewCard, SetaddNewCard] = useState([]);
    const [ListOfCards, SetListOfCards] = useState([]);
    const {auth,Setauth}=useContext(AuthContext);  
    let { id } = useParams();

    useEffect(() => {
        if(auth){
        axios.get(`http://localhost:3001/setcard/byId/${id}`).then((res) => {
            SetListOfCards(res.data);       
        }).catch((err) => {
            console.log(err);
        });}
    }, [auth]);

    const initialValues = {
        word: "",
        defination: "",
    };

    const validationSchema = Yup.object().shape({
        word: Yup.string().required("You must input a word"),
        defination: Yup.string().min(3).max(15).required("You must input a defination"),
    });

    const del=(e,id)=>{
        e.stopPropagation();
        axios.delete(`http://localhost:3001/card/${id}`,{
            headers:{
                accessToken:localStorage.getItem('accessToken'),
            }
        }).then(()=>{
            SetListOfCards(ListOfCards.filter((val)=>{
                return val.id!=id;
            }))
        })
    }

    const edit=(e,id)=>{
        e.stopPropagation();
    }

    const onSubmit = (data, { resetForm }) => {
        axios.post("http://localhost:3001/card", { word: data.word, defination: data.defination, groupCardId: id },
            {
                headers: { accessToken: localStorage.getItem("accessToken") }
            })
            .then((response) => {
                if(response.data.error){
                    alert("Please login to continue!")
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
            <div><Card ListOfCards={ListOfCards} del={del} edit={edit}/></div>
        </div>
    );
}

export default CreateCard;