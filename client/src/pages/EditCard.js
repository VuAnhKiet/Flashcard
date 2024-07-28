import { Formik, Form, Field, ErrorMessage, } from "formik";
import * as Yup from "yup";
import axios from "axios";

function EditCard({word, id, defination, state, setState, setdef,setword}) {
    const initialValues = {
        word: word,
        defination: defination,
    };

    const validationSchema = Yup.object().shape({
        word: Yup.string().required("You must input a word"),
        defination: Yup.string().min(3).max(15).required("You must input a defination"),
    });

    const onSubmit = (data, { resetForm }) => {
        axios.put("http://localhost:3001/card", { word: data.word, defination: data.defination, id: id },
            {
                headers: { accessToken: localStorage.getItem("accessToken") }
            })
            .then((response) => {
                if (response.data.error) {
                    alert("Please login to continue!")
                } else {
                    setdef(data.defination);
                    setword(data.word);
                    setState(!state);
                }
            });
        resetForm();
    };
    return (
        <div className="">
            <div className="edit-box">

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
                        <button type="submit" onClick={(e) => { e.stopPropagation(); setState(!state); }}>Close</button>
                        <button className="save" type="submit" onClick={(e) => { e.stopPropagation(); }}>Save</button>
                    </Form>)}
                </Formik>
            </div>
        </div>
    )
}

export default EditCard