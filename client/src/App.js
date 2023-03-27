import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './views/Main';
import {
  Routes,
  Route,
  useNavigate, Link
} from "react-router-dom";
import RegistrationPage from './views/RegistrationPage';
import Dashboard from './views/Dashboard';
import { useState } from 'react';
import axios from 'axios';
import Login from './views/LoginPage';
import AllImages from './views/AllImages';
import cart2 from './assets/cart2.png';




function App() {

  const [logged, setLogged] = useState(null);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const randomPrompts = ["A beautiful queen with her faithful tiger","Elsa Ariel Bella Elena,red curly hair 27 years old woman portrait, cute, 3d vector character : disney style : handpainted: digital art", "liquid otherworldly cool dreamy dog, cuddly, arrogant, powerful, high fantasy, epic, cinematic, internal glow", "fractal dragon head, Dieselpunk, Teslapunk, Spacepunk, Trey Ratcliff, Cindy Sherman, full body portrait, action shot portrait, ultra realistic, photorealisim, deeply real, amazing detail, mind-blowing detail, Moonlight Engine, Unreal Engine, Surrealistic lighting, Volumetric lighting, God rays", "beautiful city of naboo royal palace architecture with arboretum, megascan concrete texture building, cinematic composition, Jaime Jasso, Craig Mullins, wide angle, in the style of hayao miyazaki + brian froud + kim jung gi, studio ghibli, beautiful high detail enhanced 8k render", "THE CHERRY BLOSSOM TREE HOUSE + beautiful ornate treehouse in a gigantic pink cherry blossom tree + on a high blue grey and brown cliff with light snow and pink cherry blossom trees + Roger Deakins and Moebius and Alphonse Much and Guweiz + Intricate details, very realistic, cinematic lighting, volumetric lighting, photographic, + blur bokeh defocus dof", "Goldorg, demonic orc from Moria, new leader of the Gundabad, strong muscular body, ugly figure, dirty grey skin, burned wrinkled face, body interlaced with frightening armor, metal coatings crossing head, heavy muscular figure, cinematic shot, detailed, trending on Artstation, dark blueish environment, demonic backlight, unreal engine, 8k, photorealistic, ultra realistic", "Tiny cute and adorable piglet adventurer dressed in a warm overcoat with survival gear on a winters day, jean - baptiste monge , anthropomorphic", "A massive city of 300000 people with a golden citadel one of the most breathtaking castles in the world", "galaxies, spirals, space, nebulae, stars, smoke, iridescent, intricate detail, in the shape of a rabbit, octane render, 8k", "galaxies, spirals, space, nebulae, stars, smoke, iridescent, intricate detail, in the shape of a rabbit, octane render, 8k", "tropical ocean, underwater, turtles, rare fish, coral reef, iain m. banks, neal asher, j. c. staff anime studio, dorothea lange, framestore, animal logic, purely real, completely real, impersonal lighting, volumetric lighting", "kneeling cat knight, portrait, finely detailed armor, intricate design, silver, silk, cinematic lighting, 4k", "slightly populated pyramids on the moons surface space city, in the style of pluto nash, Realistic lighting, very detailed, super resolution detail, ornate detail, phenomenal detail, highly detailed, super detailed, ultra detailed, high details, exceedingly real, entirely real, definitely real, certainly real, clearly real, completely real, highly real --testp --upbeta", "a beautiful hyperrealistic detailed 3D render of a a masked assassin, borderlands, rendering by Jan Ditlev, Klaus Pillon, Abbott Fuller Graves, Atey Ghailan, genzoman", "howl's moving castle in Windsor Ontario", "epic holy cyborg necromancer, advanced technology, experimental tech, scifi armor, blue eyes, aura, atmosphere, robes, serenity, futuristic, space station, god rays, scifi, concept art, artstation, by Dariusz Zawadzki and David McClellan and Edouard Riou width:448 height:640 number:4 cfg_scale:12 sampler:k_heun","two flamingos are in love in a sunset, concept art. high quality", "Cartoon character with Dripping gloss particle explosion, extremely detailed, sharp focus, wide view, full body shot, smooth, digital illustration, by james jean, by banksy and mcbess", "futuristic city skyline, synthwave colors, neurocybernetics, neal asher, industrial light & magic, v - ray, tragic lighting, volumetric lighting, film noir lighting", "Goldorg, demonic orc from Moria, new leader of the Gundabad, strong muscular body, ugly figure, dirty grey skin, burned wrinkled face, body interlaced with frightening armor, metal coatings crossing head, heavy muscular figure, cinematic shot, detailed, trending on Artstation, dark blueish environment, demonic backlight, unreal engine, 8k, photorealistic, ultra realistic"];

  
  const handleLogout = () => {
    console.log("trying to log out")
    axios.get("http://localhost:8000/api/logout", { withCredentials: true })
      .then(res => {
        setLogged(null)
        navigate("/")
        
      })
      .catch(err => console.log(err))
  }

//   const removeFromDom = url => {
//     setLogged(logged.allImages.filter(image => image.url !== url));
// }

  return (
    <div className="App">
      {logged == null 
      
      ? 
      
      <nav className= "navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-center">
        <Link to="/login" className='navbar-brand'><button className='btn btn-outline-dark m-2 btn-sm'>Login</button></Link>
        <Link to="/register"><button className='btn btn-sm btn-outline-secondary'>Register  </button></Link>      </nav>

      : 

      <nav className= "navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-around">
        
        <div className=''>
          {logged ? <Link to={`/dashboard/${logged._id}`}><button className='btn btn-sm btn-outline-secondary mr-2'>Dashboard  </button></Link> : ""}
          <Link to={`/images/${logged._id}`}><button className='btn btn-sm btn-outline-secondary m-2'>Your Images  </button></Link>
          <button className='btn btn-outline-dark m btn-sm' onClick={handleLogout}>Logout</button>
        </div>

        <div className=''>
          <button className='btn btn-outline-light m-2 btn-sm '><img src={cart2} alt="" height={"30px"}/></button>
        </div>
        
        

        
        
      </nav>}

      <Routes>
            <Route element={ <Main logged={logged} images={images} setImages={setImages}/> }  path="/"/>
            <Route element={ <RegistrationPage setLogged={setLogged}/>}  path="/register"/>
            <Route element={ <Login setLogged={setLogged}/>}  path="/login/"/>
            
            <Route element={ <Dashboard logged={logged} setLogged={setLogged} randomPrompts={randomPrompts} handleLogout={handleLogout} images = {images} setImages={setImages}/>}  path="/dashboard/:_id"/>
            <Route element={ <AllImages logged={logged} setLogged={setLogged} handleLogout={handleLogout} images = {images} setImages={setImages}/>}  path="/images/:_id"/>

        </Routes>  

    </div>
  );
}

export default App;
