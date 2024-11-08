import React from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

function Registration() {
  const { Register } = useUser();
  const navigate = useNavigate();

  const initialValues = {
    fullname: '',
    password: '',
    email: '',
  };

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('You must input a name'),
    password: Yup.string().required('You must input a password'),
    email: Yup.string().required('You must input an email'),
  });

  const onSubmit = async (data, { resetForm }) => {
    const response = await Register(data);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Registration successful!")
      resetForm();
      navigate('/login');
    }
  };

  return (
    <div className="regist-body">
      <div className="regist-main">
        <h1 className="h1">REGISTER</h1>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <label className="reglabel">Username: </label>
            <ErrorMessage name="fullname" component="span" className="span" />
            <Field
              autoComplete="off"
              id="input"
              name="fullname"
              className="input"
              placeholder="Username"
            />

            <label className="reglabel">Password: </label>
            <ErrorMessage name="password" component="span" className="span" />
            <Field
              autoComplete="off"
              id="input"
              type="password"
              name="password"
              className="input"
              placeholder="New password"
            />

            <label className="reglabel">Email: </label>
            <ErrorMessage name="email" component="span" className="span" />
            <Field
              autoComplete="off"
              type="email"
              id="input"
              name="email"
              className="input"
              placeholder="Email address"
            />

            <div className="wrap">
              <button className="button" type="submit">
                Register
              </button>
            </div>
          </Form>
        </Formik>

        <p>
          Already have an account?{' '}
          <Link style={{ textDecoration: 'none' }} to="/login">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;
