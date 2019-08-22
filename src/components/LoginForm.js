import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik, Formik } from 'formik';
import * as Yup from 'yup';

const LoginForm = ({ errors, touched, values, status }) => {

    const [users, setUsers] = useState([]);
    // useEffect(() => {
    //     if(status) {
    //         setUsers([...users, status])
    //     }
    // }), []

    return (
        <div className='user-form'>
            <h1>User Form</h1>
            <>
            <Formik>
                <Form>
                    <Field name='username' type='text' placeholder='Name' />
                    {touched.username && errors.username && <p>{errors.username}</p>} 
                    <Field name='email' type='email' placeholder='Email' />
                    {touched.email && errors.email && <p>{errors.email}</p>}
                    
                    <Field name='password' type='password' placeholder='Password' />
                    {touched.password && errors.password && <p>{errors.password}</p>}
                    
                    <label className='checkbox-container'>
                        <Field name='tos' type='checkbox' checked={values.tos}/>
                        {touched.tos && errors.tos && <p>{errors.tos}</p>}
                        Terms Of Service
                    </label>
                    
                    <button type='submit'>Submit!</button>
                </Form>
            </Formik>
            </>

            {/* {users.map(user => {
                <div className='user' >
                    <h2>Name: {user.username}</h2>
                    <h3>Email: {user.email}</h3>
                    <h3>Password: {user.password}</h3>
                    <h3>TOS: {user.tos}</h3>
                </div>
            })} */}
        </div>
    )
}

const FormikLoginForm = withFormik({
    mapPropsToValues({ username, email, password, tos }) {
        return {
            username: username || '',
            email: email || '',
            password: password || '',
            tos: tos || false
        };
    },

    validationSchema: Yup.object().shape({
        username: Yup.string().required('username is required'),
        email: Yup.string().required('email is required'),
        password: Yup.string().required('password is required'),
        tos: Yup.string().required('terms of service is required')    
    }),

    handleSubmit(values, { setUsers }) {
        axios.post('https://reqres.in/api/users/', values)
        .then(res => {
            setUsers(res.data)
            console.log(setUsers(res.data))
        })
        .catch(error => console.log(error.response))
    }


})(LoginForm)

export default FormikLoginForm;