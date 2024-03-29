import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import cart_btn from '../assets/cart_btn.png';
import delete_btn from '../assets/delete_btn.png';


const AllImages = (props) => {
    const {logged, setLogged, handleLogout} = props;
    const [user, setUser] = useState({});
    const {_id} = useParams();


      useEffect(() => {
        console.log(_id)
        axios.get("http://localhost:8000/api/user/" + _id, { withCredentials: true })
          .then(res => {
            setUser(res.data)
            setLogged(res.data)
            console.log("user: ", res.data);            
            
          })
          .catch(err => console.log(err))
    }, [_id]);


    // const deleteImage = url => {
    //     // console.log(images);
    //     // console.log(url)
    //     setImages(images.filter(image => image.url !== url));
    // }


    const{allImages} = user;
    if(!allImages){
        return (
            <p> Loading Images </p>
        )
    }

    return(
        <div className='container mt-5 d-flex flex-wrap'>
            {user.allImages.map( (image, i) => 
            <div key = {i} className='m-5 align-content-start '> 
                <div className='d-flex'>
                    <img style={{border:"15px solid black", width:"300px", height: "auto", background:"white", margin:"auto", padding:"15px 15px"}}src={image.URL} alt=""/>
                </div>
                
                <div>
                    <button className='btn btn-outline-light m-2 btn-sm'><img src={cart_btn} alt="" height={"30px"}/></button>
                </div>

            </div>
            )}


        </div>
    )
    
}

export default AllImages;
