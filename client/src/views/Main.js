import React from 'react';
// import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import background from '../assets/LazyArtis.png'


const Main = () => {

    
    return (
        // <div style={{ backgroundImage: "url(../assets/LazyArtis.png) no-repeat center center fixed", backgroundSize:'cover', WebkitBackgroundSize:"cover", MozBackgroundSize:"cover", OBackgroundSize:"cover"}}>
        <div>
            <div  style={{backgroundImage: `url(${background})`, height:"100vh", backgroundSize:"cover", backgroundRepeat:"no-repeat", backgroundPosition:"center center"}}>
                {/* <img src={background} alt=""/> */}
            </div>
            
            {/* <img className='bg'src={background} alt=""></img> */}
            {/* <Link to ="/login"><button className='btn btn-light' id="login-btn" > Log In  </button></Link>
            <Link to="/register"> <button className='btn btn-light' id="register-btn"> Register  </button> </Link> */}
        </div>
        
    );

}

export default Main;