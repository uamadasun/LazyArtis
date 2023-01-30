import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const RegistrationForm = (props) => {
    const { inputs, handleInput, handleSubmit, errors, submitValue} = props;

    return (
        <div className='container mt-5'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className="form-control">

            {errors.length > 0 ? errors.map((err, index) => <p key={index} className="text-danger">{err}</p>) : ""}


                <p>
                    <label>First Name: </label><br/>
                    <input type="text" onChange={handleInput} name ="firstName"/>
                </p>


                <p>
                    <label>Last Name: </label><br/>
                    <input type="text" onChange={handleInput} name ="lastName" />
                </p>
                <p>
                    <label>Email: </label><br/>
                    <input type="text" onChange={handleInput} name ="email" />
                </p>
                <p>
                    <label>Password: </label><br/>
                    <input type="password" onChange={handleInput} name ="password" />
                </p>
                <p>
                    <label>Confirm Password: </label><br/>
                    <input type="password" onChange={handleInput} name ="confirmPassword" />
                </p>
                <input type="submit" value={submitValue} className="btn btn-dark"/>
            </form>
            <Link to="/login">Already have an account?</Link>

        </div>
        
    )
}

export default RegistrationForm;
