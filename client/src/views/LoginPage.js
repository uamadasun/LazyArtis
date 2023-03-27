import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// import LoggedContext from '../LoggedContext';



const Login = props => {
    const { setLogged } = props;
    // const loggedUser = useContext(LoggedContext)
    const initialUser = {
        email: "",
        password: ""
    }

    const initialErrors = {
        email: "",
        password: ""
    }
    const [user, setUser] = useState(initialUser);
    const [errors, setErrors] = useState(initialErrors);
    const navigate = useNavigate();

    

    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/login", user, { withCredentials: true })
            .then(res => {
                setLogged(res.data.user);
                setUser(res.data.user);
                console.log(res.data.user._id);
                // console.log("we're logged in");
                // navigate(`/dashboard/${res.data.user._id}`);
                navigate(`/dashboard/${res.data.user._id}`);
                console.log("from login: ", res.data.user)
            })
            .catch(err => {
                console.log(err.response)
                console.log("you've hit an error!");
                const errorResponse = err.response.data.msg; // Get the errors from err.response.data
                const errorArr = []; //; Define a temp error array to push the messages in
                errorArr.push(errorResponse)
                // for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                //     errorArr.push(errorResponse[key].message)
                // }
                setErrors(errorArr
                );
                console.log("errors: ", errorArr)
            })
    }


    return (
        <div>
            <form  onSubmit={handleSubmit} className ="container mt-5">
            {errors.length > 0 ? errors.map((err, index) => <p key={index} className="text-danger">{err}</p>) : ""}
                <h2>Login</h2>
                <p>
                    <label>Email: </label><br/>
                    <input type="text" onChange={handleInputChange} name ="email"/>
                </p>
                <p>
                    <label>Password: </label><br/>
                    <input type="password" onChange={handleInputChange} name ="password"/>
                </p>
                <button type="submit" className="btn" style={{backgroundColor:"#F1ADA7", fontWeight:"bolder", color:"white"}}>Submit</button>



            </form>
            <Link to="/register">Don't have an account?</Link>


        </div>
        

    );


}

export default Login;