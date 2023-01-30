import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Login = props => {
    const { setLogged } = props;
    const initialState = {
        email: "",
        password: ""
    }
    const [log, setLog] = useState(initialState);
    const [errors, setErrors] = useState(initialState);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setLog({
            ...log,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/login", log, { withCredentials: true })
            .then(res => {
                setLogged(res.data.user);
                // console.log(res.data.user._id);
                // console.log("we're logged in");
                navigate(`/dashboard/${res.data.user._id}`);
            })
            .catch(err => {
                console.log(err.response)
                console.log("you've hit an error!");
                setErrors(
                    {
                        password: {
                            message: "Invalid Credentials"
                        },
                        email: {
                            message: "Invalid Credentials"
                        }
                    }
                );
                console.log("errors: ", errors)
            })
    }


    return (
        <div>
            <form  onSubmit={handleSubmit} className ="container mt-5">
                <h2>Login</h2>
                <p>
                    <label>Email: </label><br/>
                    <input type="text" onChange={handleInputChange} name ="email"/>
                </p>
                <p>
                    <label>Password: </label><br/>
                    <input type="password" onChange={handleInputChange} name ="password"/>
                </p>
                <button type="submit" className="btn btn-dark">Submit</button>



            </form>
            <Link to="/register">Don't have an account?</Link>


        </div>
        

    );


}

export default Login;