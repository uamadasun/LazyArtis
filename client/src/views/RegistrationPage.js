import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm';

const RegistrationPage = props => {
    const { setLogged } = props;
    const initialUser = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    }
    const initialErrors = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    }

    const navigate = useNavigate();

    const [user, setUser] = useState(initialUser)
    const [errors, setErrors] = useState(initialErrors);

    const handleInput = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/register", user, { withCredentials: true })
            .then(res => {

                    setLogged(user);
                    setUser(user);
                    navigate(`/dashboard/${user._id}`)
                    console.log("from registration: ", user);

                    // else {
                //     console.log(res.data)
                //     setErrors(res.data)
                // }
            })
            .catch(err => {
                const errorResponse = err.response.data.err.errors; // Get the errors from err.response.data
                const errorArr = []; //; Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                
                setErrors(errorArr);
                console.log(errorResponse)
            });
    }
    return (
        <div className="container vh-100"  >
            <RegistrationForm
                inputs={user}
                errors={errors}
                handleInput={handleInput}
                handleSubmit={handleSubmit}
                submitValue="Register"
            />
        </div>
    )
}

export default RegistrationPage;