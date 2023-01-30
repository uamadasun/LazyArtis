import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import logo from '../assets/logo-white.png';



const Dashboard = (props) => {
    const {logged, setLogged} = props;
    const [user, setUser] = useState(null);
    const {_id} = useParams;
    const [newPrompt, setNewPrompt] = useState("");
    const [generatedImg, setGeneratedImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
    });
    const openai = new OpenAIApi(configuration);

    //   useEffect(() => {
    //     console.log("logged from dashboard", logged)
    //     console.log("user from dashboard", user)
    //     axios.get("http://localhost:8000/api/user/" + _id, { withCredentials: true })
    //       .then(res => {
    //         setUser(res.data)
            
    //       })
    //       .catch(err => console.log(err))
    // }, [logged, _id, user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
            },
            body: JSON.stringify({
            prompt: newPrompt,
            //   'model': "text-davinci-003",
            n: 1,
            size: "256x256",
            })
        };
        fetch('https://api.openai.com/v1/images/generations', requestOptions)
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                console.log(data.data[0].url);
                setGeneratedImage(data.data[0].url);
            }).catch(err => {
                console.log(err);
            });
    }

    // const handleSubmit = async(e) => {
    //     e.preventDefault();
    //     setLoading(true)
    //     const response = await openai.createImage({
    //         prompt: newPrompt,
    //         n: 1,
    //         size: "256x256",
    //     });
    //     setLoading(false)
    //     setGeneratedImage(response.data.data[0].url)
    // }
    
    return (
        <div className='container mt-5'>
            <Link to="/logout"> <button id="logout-btn" className='btn btn-outline-dark'> Logout</button> </Link>
            <img src={logo} alt="" height="300px"/>
            <h1> Hello from the Dashboard!</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label className='mb-2 mt-5'> Write a prompt to create your image: </label>
                    <textarea type="text" name="prompt"  className='form-control' rows="4" cols="50" onChange={(e) => setNewPrompt(e.target.value)} />
                </div>
                <input type="submit" className='btn btn-dark  mt-4 mb-3' value="Submit Prompt"/>
            </form>
            {loading ? (
                <h2> Image generation in progress ... Please wait!</h2>
            ) : (<></>)}
            {generatedImg !== null ? <img src={generatedImg} alt=""/> : ""}
            
            {/* {user.firstName} */}
        </div>
        
    );

}

export default Dashboard;