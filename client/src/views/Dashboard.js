import React, { useEffect, useState, useContext, useNavigate } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import logo from '../assets/logo-white.png';
import { Configuration, OpenAIApi } from "openai";
// import LoggedContext from '../LoggedContext';




const Dashboard = (props) => {
    const {logged, setLogged, handleLogout, images, setImages, randomPrompts} = props;
    // const {handleLogout, images, setImages, randomPrompts} = props;
    // const loggedUser = useContext(LoggedContext)

    const [user, setUser] = useState({});
    const {_id} = useParams();
    const [newPrompt, setNewPrompt] = useState("");
    const [generatedImg, setGeneratedImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
        organization: 'org-Hk6UimJXisVmOz2oLXOLZON2',
    apiKey: process.env.OPEN_AI_KEY,
    });
    const openai = new OpenAIApi(configuration);
    
    const AWS = require('aws-sdk');    

    AWS.config.update({
        maxRetries: 3,
        httpOptions: {timeout: 30000, connectTimeout: 5000},
        region: "us-west-2",
        signatureVersion: 'v4',
        accessKeyId: AWS_ACCESS_KEY ,
        secretAccessKey: AWS_SECURE_ACCESS_KEY
    });

    const s3 = new AWS.S3();



    useEffect(() => {
        console.log(_id)
        axios.get("http://localhost:8000/api/user/" + _id, { withCredentials: true })
          .then(res => {
            setUser(res.data)
            setLogged(res.data)
            console.log(images);
          })
          .catch(err => console.log(err))
    }, [_id]);

    const handleSubmit =  (e) => {
        e.preventDefault();
        setLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + OPEN_AI_KEY
            },
            body: JSON.stringify({
            prompt: newPrompt,
            n: 1,
            size: "256x256",
            }),
            "Access-Control-Allow-Origin": "*"
            
        };
        fetch('https://api.openai.com/v1/images/generations', requestOptions)
            .then(response => response.json())
            .then(async data => {
                setLoading(false);

                setGeneratedImage(data.data[0].url);
                console.log(data.data[0]);

                // AWS CODE STARTS HERE
                const imageName = data.data[0].url;
                const imageUrl = `${data.data[0].url}`;
                const bucketName = 'lazyartis';
                const key = `images/${logged._id}/${imageName}`;
                // HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*")

                // const imageName = "flamingo";
                // const imageUrl = `https://static.nationalgeographic.co.uk/files/styles/image_3200/public/01-flamingo-friendships-nationalgeographic_1477297.webp?w=1600&h=900`;
                // const bucketName = 'lazyartis';
                // const key = `images/${logged._id}/${imageName}`;


                await axios.get(imageUrl, {responseType: 'blob'} )
                .then(async (response) => {

                    const params = {Bucket: bucketName, Key: key, Body: response.data};
                    
                    s3.upload(params, function(err, data) {
                    if (err) {
                        console.error('Error uploading image to S3: ', err);
                    } else {
                        console.log('Image successfully uploaded to S3: ', data);
                        const url = s3.getSignedUrl('getObject', {
                            Bucket: bucketName,
                            Key: key,
                            Expires: 60 // The URL will be valid for 60 seconds
                        });
                        // console.log("This is the data: ", data)
                        // console.log("URL:", url)
                        // console.log("data location: ", data.Location)

                        axios.put('http://localhost:8000/api/image/' + _id, 
                            {"URL": `${data.Location}`}
                        )
                        .then(res => console.log(url))
                        .catch(err => console.error(err))
                    }
                    });
                })
            .catch(function(error) {
                console.error('Error fetching image this image: ', error);
            });

            }).catch(err => {
                console.log(err);
            });
    }

    const handleNewSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
        const response = await openai.createImage({
            prompt: newPrompt,
            n: 1,
            size: "256x256",
        });
        console.log("response: ", response);
        setLoading(false)
        setGeneratedImage(response.data.data[0].url)
        
    }

    const promptGenerator = async() => {
        const promptIndex =  await Math.floor(Math.random() * randomPrompts.length);
        setNewPrompt(randomPrompts[promptIndex])
        // look at https://prompthero.com/api
        // console.log("prompt index", promptIndex)
        return
    }
    
    return (
        <div className='container mt-5'>
            {/* <button id="logout-btn" className='btn btn-outline-dark' onClick={handleLogout}> Logout</button>  */}
            <img src={logo} alt="" height="300px"/>
            <h1> Hello, {user['firstName']}!</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>

                    {!loading ? <label className='mb-2 mt-5'> Write a prompt to create your image: </label> 
                    
                    : 
                    <div className="progress mb-3">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: "75%"}}></div>
                    </div>
                    }
                    {/* <label className='mb-2 mt-5'> Write a prompt to create your image: </label> */}
                    <textarea type="text" value={newPrompt} name="prompt"  className='form-control' rows="4" cols="50" onChange={(e) => setNewPrompt(e.target.value)} />
                </div>
                <button type="button" className='btn btn-dark m-3' onClick={promptGenerator} style={{backgroundColor:"white", fontWeight:"bolder", color:"#F1ADA7"}}>Generate Random Prompt</button>
                <input type="submit" className='btn btn-dark  m-3'  style={{backgroundColor:"#F1ADA7", fontWeight:"bolder", color:"white"}} value="Submit Prompt"/>
            </form>
            
            <div>
            {loading ?  <label className="mb-3" style={{backgroundColor:"#F1ADA7", fontWeight:"bolder", color:"white"}}>Image generation in progress... Please wait!</label>:<></>}
            </div>
            
            {generatedImg !== null ? <img src={generatedImg} alt=""/> : ""}
            {/* {!user.allImages.length > 0 ? "": user.allImages[0]} */}
            {/* {user.firstName} */}
        </div>
        
    );

}

export default Dashboard;