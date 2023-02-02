import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import logo from '../assets/logo-white.png';
import { Configuration, OpenAIApi } from "openai";
// import {http} from "https"; // or 'https' for https:// URLs
// import {fs} from "fs";
// import crypto from 'crypto' ;
// const {promisify}= require("util")  ;
// const randomBytes = promisify(crypto.randomBytes)




const Dashboard = (props) => {
    const {logged, setLogged, handleLogout, images, setImages, randomPrompts} = props;
    const [user, setUser] = useState({});
    const {_id} = useParams();
    const [newPrompt, setNewPrompt] = useState("");
    const [generatedImg, setGeneratedImage] = useState(null)
    const [loading, setLoading] = useState(false)
    // const [images, setPossibleURL] = useState("");
    // const fs = require('fs');
    // const http = require('https');
    // console.log("random prompts", randomPrompts)

    




    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
        organization: 'org-Hk6UimJXisVmOz2oLXOLZON2',
    apiKey: process.env.OPEN_AI_KEY,
    });
    const openai = new OpenAIApi(configuration);
    
    const AWS = require('aws-sdk');    
    // Configure the AWS SDK with your AWS access key and secret access key
    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY ,
        secretAccessKey: process.env.AWS_SECURE_ACCESS_KEY
    });

    // Create an S3 client
    const s3 = new AWS.S3();



    useEffect(() => {
        console.log(_id)
        // console.log("logged from dashboard", user)
        // console.log("user from dashboard", user)
        axios.get("http://localhost:8000/api/user/" + _id, { withCredentials: true })
          .then(res => {
            setUser(res.data)
            setLogged(res.data)
            console.log(images);
            // console.log("user: ", res.data);
            // console.log("openai: ", configuration)
            // console.log("configuration.apiKey: ", configuration.apiKey)
            // console.log("process.env.OPENAI_KEY:", process.env.OPENAI_KEY)
            
            
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
            'Authorization': 'Bearer'
            },
            body: JSON.stringify({
            prompt: newPrompt,
            n: 1,
            size: "256x256",
            }),
            // "Access-Control-Allow-Origin": "*"
            
        };
        fetch('https://api.openai.com/v1/images/generations', requestOptions)
            .then(response => response.json())
            .then(async data => {
                setLoading(false);

                setGeneratedImage(data.data[0].url);
                setImages([...images, data.data[0]]);
                console.log(data.data[0]);


                // const response = await openai.createImage({
                //     prompt: newPrompt,
                //     n: 1,
                //     size: "256x256",
                //   });

                // const file = fs.createWriteStream(`${data.data[0].url}`);
                // const request = http.get(response.data.data[0].url, function (response) {
                // response.pipe(file);
                // file.on("finish", () => {
                //     file.close();
                //     console.log("Download Done!");
                // });
                // });


                // AWS CODE STARTS HERE
                // const imageName = data.data[0].url;
                // const imageUrl = `${data.data[0].url}`;
                // const bucketName = 'lazyartis';
                // const key = `images/${logged._id}/${imageName}`;


                // axios.get(imageUrl, {responseType: 'blob'})
                // .then(function(response) {
                    
                    



                //     const params = {Bucket: bucketName, Key: key, Body: response.data};
                    
                //     s3.upload(params, function(err, data) {
                //     if (err) {
                //         console.error('Error uploading image to S3: ', err);
                //     } else {
                //         console.log('Image successfully uploaded to S3: ', data);
                //         const url = s3.getSignedUrl('getObject', {
                //             Bucket: bucketName,
                //             Key: key,
                //             Expires: 60 // The URL will be valid for 60 seconds
                //         });

                //         axios.put('http://localhost:8000/api/image/' + _id, 
                //             url
                //         )
                //         .then(res => console.log(url))
                //         .catch(err => console.error(err))
                //     }
                //     });
                // })
                // .catch(function(error) {
                //     console.error('Error fetching image: ', error);
                // });
                
                axios.put('http://localhost:8000/api/image/' + _id, 
                    // data.data[0].url
                    data.data[0]
                )
                .then(res => console.log(data.data[0]))
                .catch(err => console.error(err))









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

    // const saveImageHandler= (url) => {
    //     // const imageUrl = "https://.../image.jpg";

    //     fetch(url)
    //     //                         vvvv
    //     .then(response => response.blob())
    //     .then(imageBlob => {
    //         // Then create a local URL for that image and print it 
    //         const imageObjectURL = URL.createObjectURL(imageBlob);
    //         console.log(imageObjectURL);
    //     });
    // }

    // const saveImageHandler= (url) => {
    //     const file = fs.createWriteStream(`${url}`);
    //     const request = http.get(response.data.data[0].url, function (response) {
    //     response.pipe(file);
    //     file.on("finish", () => {
    //         file.close();
    //         console.log("Download Done!");
    //     });
    // }
    // )}    
    const promptGenerator = async() => {
        const promptIndex =  await Math.floor(Math.random() * randomPrompts.length);
        setNewPrompt(randomPrompts[promptIndex])
        // look at https://prompthero.com/api
        // console.log("prompt index", promptIndex)
       
        return
    }
    
    console.log(newPrompt)

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
                <input type="submit" className='btn btn-dark  m-3'  style={{backgroundColor:"#F1ADA7", fontWeight:"bolder", color:"white"}} value="Submit Prompt"/>
                <button type="button" className='btn btn-dark m-3' onClick={promptGenerator} style={{backgroundColor:"white", fontWeight:"bolder", color:"#F1ADA7"}}>Generate Random Prompt</button>
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