import { Link } from 'react-router-dom';
import background from '../assets/LazyArtis.png'


const Main = () => {

    
    return (
        <div>
            <div  style={{backgroundImage: `url(${background})`, height:"100vh", backgroundSize:"cover", backgroundRepeat:"no-repeat", backgroundPosition:"center center"}}>
            </div>
        </div>
    );

}

export default Main;